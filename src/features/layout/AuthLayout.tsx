import { Suspense } from 'react';
import { AppHeader } from './AppHeader';
import { AppLogo } from './AppLogo';
import { ContentCard } from './ContentCard';
import { AppLoading } from './AppLoading';
import { useLocation } from 'react-router';
import { AppContent } from './AppContent';

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <>
      <AppHeader />
      <AppContent>
        <Suspense key={location.key} fallback={<AppLoading />}>
          <div className='max-w-lg flex flex-col items-center gap-4 mx-auto'>
            <AppLogo />
            <ContentCard>{children}</ContentCard>
          </div>
        </Suspense>
      </AppContent>
    </>
  );
};
