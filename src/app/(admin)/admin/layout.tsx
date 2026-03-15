import { redirect } from 'next/navigation';

import { authActions } from '@/actions/auth';
import { guardAdminAccess } from '@/lib/auth/admin-guard';
import { AdminShell } from './ui/admin-shell';

import './style.css';

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

  const me = await authActions.getMe();

  return <AdminShell me={me}>{children}</AdminShell>;
}
