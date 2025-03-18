import { Button } from '@/core/components/Button';
import { Field } from '@/core/components/Field';
import { Form } from '@/core/components/Form';
import { Input } from '@/core/components/Input';
import { PasswordInput } from '@/core/components/PasswordInput';
import { getDefaultPathname } from '@/features/routing/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLoginMutation } from './rtkApis';
import { setAccessToken, setClientToken } from './utils';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password should have at least 8 characters.' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

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

      return;
    }

    const { accessToken, clientToken } = response.data.tokens;

    setAccessToken(accessToken);
    setClientToken(clientToken);

    const pathname = await getDefaultPathname(response.data.view);

    navigate(pathname);
  };

  return (
    <>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-3xl font-semibold'>Welcome back!</h1>
        <p>Login to continue with Opensend</p>
      </div>
      <Form
        form={form}
        onSubmit={form.handleSubmit(handleValidSubmit)}
        className='flex flex-col gap-4 mt-8'
      >
        <Field
          component={Input}
          name='email'
          type='email'
          placeholder='Email'
          autoComplete='email'
          prefix={<Mail />}
        />
        <Field
          component={PasswordInput}
          name='password'
          type='password'
          placeholder='Password'
          autoComplete='current-password'
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
          <Button
            variant='outline-secondary'
            onClick={() => {
              alert('This feature is not implemented yet.');
            }}
          >
            Forgot your password?
          </Button>
        </div>
      </Form>
    </>
  );
}
