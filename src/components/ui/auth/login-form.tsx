'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/common/button';
import SignInWithGoogle from '@/components/common/sign-in-with-google';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { LoginSchema, type LoginFormInput } from '@/schema/login.schema';

export function LoginForm() {
  const [msg, setMsg] = useState<string | null>(null);

  const supabase = supabaseBrowserClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '' },
  });

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const onSubmit: SubmitHandler<LoginFormInput> = async (
    data: LoginFormInput
  ) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });
    setMsg(
      error ? error.message : 'We sent you a login link. Check your email.'
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 md:space-y-6 w-full'
    >
      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          placeholder='Eg. example@example.com'
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'err-email' : undefined}
          className={`bg-gray-50 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        />
        {errors.email && (
          <p
            id='err-email'
            className='mt-1 text-sm text-red-600'
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {msg && <p className='text-sm text-gray-600'>{msg}</p>}

      <Button
        fullWidth
        variant='primary'
        type='submit'
        disabled={!isValid}
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Continue with Email'}
      </Button>

      <SignInWithGoogle />
    </form>
  );
}
