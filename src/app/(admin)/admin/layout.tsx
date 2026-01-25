import { redirect } from 'next/navigation';

import { Header } from '@/components/admin/header';
import { supabaseServerClient } from '@/lib/supabase/server';
import { guardAdminAccess } from '@/lib/auth/admin-guard';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login?error=NO_SESSION');
  if (!user.email) redirect('/auth/login?error=NO_EMAIL');

  const guard = await guardAdminAccess({
    supabaseUserId: user.id,
    email: user.email,
  });

  if (!guard.ok) {
    await supabase.auth.signOut();
    redirect(`/auth/login?error=${guard.reason}`);
  }

  return (
    <div
      id='main-wrapper'
      data-scope='admin'
      className='min-h-scree'
    >
      <Header />
      <main>{children}</main>
    </div>
  );
}
