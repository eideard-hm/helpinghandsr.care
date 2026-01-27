import { redirect } from 'next/navigation';

import { authActions } from '@/actions/auth';
import { Header } from '@/components/common/header';
import { guardAdminAccess } from '@/lib/auth/admin-guard';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
