import { Input } from '@/core/components/Input';
import { AuthContent } from '../layout/AuthContent';
import { Form } from '@/core/components/Form';
import { Field } from '@/core/components/Field';
import { useForm } from 'react-hook-form';
import { Eye, Lock, Mail } from 'lucide-react';
import { Button } from '@/core/components/Button';
import { PasswordInput } from '@/core/components/PasswordInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from './rtkApis';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  // formState.isDirty is not working if value is pasted, so we need to check each fields
  const isDirty = Object.values(form.formState.dirtyFields).some(Boolean);

  const [login] = useLoginMutation();

  const handleValidSubmit = async (data: LoginFormData) => {
    const response = await login(data);

    if (response.error) {
      if ('message' in response.error && 'code' in response.error) {
        const isPasswordError = response.error.code?.toLocaleLowerCase().includes('password');
        const errorField = isPasswordError ? 'password' : 'email';

        form.setError(errorField, { message: response.error.message });
      }
    }
  };

  return (
    <AuthContent>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-3xl font-semibold'>Welcome back!</h1>
        <p>Login to continue with Opensend</p>
      </div>
      <Form
        form={form}
        onSubmit={form.handleSubmit(handleValidSubmit)}
        className='flex flex-col gap-4 mt-8'
      >
        <Field component={Input} name='email' type='email' placeholder='Email' prefix={<Mail />} />
        <Field
          component={PasswordInput}
          name='password'
          type='password'
          placeholder='Password'
          prefix={<Lock />}
          suffix={<Eye />}
        />

        <div className='flex flex-col gap-2'>
          <Button
            type='submit'
            disabled={!form.formState.isValid || !isDirty}
            loading={form.formState.isSubmitting}
          >
            Login
          </Button>
          <Button variant='outline-secondary'>Forgot your password?</Button>
        </div>
      </Form>
    </AuthContent>
  );
}
