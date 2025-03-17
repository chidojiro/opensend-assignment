import { Suspense } from 'react';
import { AppHeader } from './AppHeader';
import { AppLoading } from './AppLoading';
import { useLocation } from 'react-router';
import { AppContent } from './AppContent';

type Props = {
  children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <>
      <AppHeader authenticated />
      <AppContent>
        <Suspense key={location.key} fallback={<AppLoading />}>
          {children}
        </Suspense>
      </AppContent>
    </>
  );
};
