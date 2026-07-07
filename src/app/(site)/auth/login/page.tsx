
import { LoginForm } from '@/components/ui/auth/login-form';
import { env } from '@/config/env';
import { FormLayout } from '@/layout/form-layout';

export default function LoginPage() {
  return (
    <section className='py-16 bg-gray-50 container mx-auto px-4 max-w-7xl'>
      <FormLayout
        formTitle='Log in to your account'
        brand={env.brand}
        logotype={env.brandLogotype}
      >
        <LoginForm />
      </FormLayout>
    </section>
  );
}
