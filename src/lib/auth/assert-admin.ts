'use server';

import { redirect } from 'next/navigation';

import { authActions } from '@/actions/auth';
import { guardAdminAccess } from '@/lib/auth/admin-guard';

export async function assertAdminBusiness() {
  const user = await authActions.getUser();

  if (!user) redirect('/auth/login?error=NO_SESSION');
  if (!user.email) redirect('/auth/login?error=NO_EMAIL');

  const guard = await guardAdminAccess({
    supabaseUserId: user.id,
    email: user.email,
  });

  if (!guard.ok) {
    await authActions.signOut();
    redirect(`/auth/login?error=${guard.reason}`);
  }

  return guard;
}
