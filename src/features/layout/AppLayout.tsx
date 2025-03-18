import { Suspense } from 'react';
import { AppLoading } from './AppLoading';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <main className='bg-theme-gray-100 flex flex-col min-h-screen max-w-screen'>
      <Suspense fallback={<AppLoading />}>{children}</Suspense>
    </main>
  );
};
