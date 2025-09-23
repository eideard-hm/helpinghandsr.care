import { redirect } from 'next/navigation';

import { authActions } from '@/actions/auth';

export const dynamic = 'force-dynamic';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authActions.getUser();
  if (session) {
    redirect('/admin');
  }

  return <>{children}</>;
}
