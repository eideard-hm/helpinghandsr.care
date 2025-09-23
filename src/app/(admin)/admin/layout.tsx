import { redirect } from 'next/navigation';

import { authActions } from '@/actions/auth';
import { Header } from '@/components/admin/header';

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authActions.getUser();
  if (!session) {
    redirect('/auth/login');
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
