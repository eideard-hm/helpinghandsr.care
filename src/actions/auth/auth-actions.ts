import type { User } from '@supabase/supabase-js';

import { catchError } from '@/lib/promise';
import { supabaseServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import type { Me } from './auth.type';

export async function getUser(): Promise<User | null> {
  const [supabaseServer, err] = await catchError(supabaseServerClient());
  if (err || !supabaseServer) return null;

  const [data, err2] = await catchError(supabaseServer.auth.getUser());
  if (err2 || !data) return null;

  return data.data.user;
}

export async function signOut(): Promise<void> {
  const [supabaseServer, err] = await catchError(supabaseServerClient());
  if (err || !supabaseServer) return;
  await supabaseServer.auth.signOut();
}

export const getMe = async (): Promise<Me | null> => {
  try {
    const [supabaseServer, err] = await catchError(supabaseServerClient());
    if (err || !supabaseServer) return null;

    const {
      data: { user },
      error: authError,
    } = await supabaseServer.auth.getUser();

    if (authError || !user) return null;

    const adminUser = await prisma.adminUser.findFirst({
      where: {
        isActive: true,
        OR: [{ supabaseUserId: user.id }, { email: user.email ?? '' }],
      },
      select: {
        id: true,
        email: true,
        role: true,
        staffId: true,
        businessId: true,
        business: {
          select: {
            id: true,
            name: true,
          },
        },
        staff: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!adminUser) return null;

    const name =
      adminUser.staff?.name ||
      (user.user_metadata?.full_name as string | undefined) ||
      user.email?.split('@')[0] ||
      'User';

    return {
      id: adminUser.id,
      email: adminUser.email,
      name,
      role: adminUser.role,
      businessId: adminUser.business.id,
      businessName: adminUser.business.name,
      staffId: adminUser.staffId,
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};
