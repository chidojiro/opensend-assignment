import { Suspense } from 'react';
import { AppHeader } from './AppHeader';
import { AppLogo } from './AppLogo';
import { ContentCard } from './ContentCard';
import { AppLoading } from './AppLoading';
import { useLocation } from 'react-router';

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <>
      <AppHeader />
      <Suspense key={location.key} fallback={<AppLoading />}>
        <div className='flex-1 w-full px-4 max-w-lg mx-auto mt-20 flex flex-col items-center gap-4'>
          <AppLogo />
          <ContentCard>{children}</ContentCard>
        </div>
      </Suspense>
    </>
  );
};
