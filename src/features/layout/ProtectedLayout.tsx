import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppLoading } from './AppLoading';

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
