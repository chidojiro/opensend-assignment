import { Suspense } from 'react';
import { AppHeader } from './AppHeader';
import { AppLoading } from './AppLoading';
import { useLocation } from 'react-router';

type Props = {
  children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <>
      <AppHeader authenticated />
      <Suspense key={location.key} fallback={<AppLoading />}>
        <div className='flex-1 px-4 md:px-6 lg:px-10 py-10'>{children}</div>
      </Suspense>
    </>
  );
};
