import z from 'zod';

export const LoginSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export type LoginFormInput = z.input<typeof LoginSchema>;
