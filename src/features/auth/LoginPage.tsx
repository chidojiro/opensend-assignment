import { Input } from '@/core/components/Input';
import { AuthContent } from '../layout/AuthContent';
import { Form } from '@/core/components/Form';
import { Field } from '@/core/components/Field';
import { useForm } from 'react-hook-form';
import { Eye, Lock, Mail } from 'lucide-react';
import { Button } from '@/core/components/Button';
import { PasswordInput } from '@/core/components/PasswordInput';

export default function LoginPage() {
  const form = useForm();

  return (
    <AuthContent>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-semibold'>Welcome back!</h1>
        <p className='text-sm'>Login to continue with Opensend</p>
      </div>
      <Form form={form} className='flex flex-col gap-4 mt-8'>
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
          <Button>Login</Button>
          <Button variant='outline-secondary'>Forgot your password?</Button>
        </div>
      </Form>
    </AuthContent>
  );
}
