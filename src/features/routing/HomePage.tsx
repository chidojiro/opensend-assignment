import { isAccessTokenValid, logout } from '@/features/auth/utils';
import { Navigate } from 'react-router';
import { ROUTES } from './constants';
import { useProfileQuery } from '@/features/auth/rtkApis';
import { AppLoading } from '@/features/layout/AppLoading';
import { useEffect, useState } from 'react';
import { getDefaultPathname } from './utils';

export default function HomePage() {
  const [defaultPathname, setDefaultPathname] = useState<string>();

  const { data } = useProfileQuery();

  useEffect(() => {
    (async () => {
      if (!data) return;

      try {
        const pathname = await getDefaultPathname(data.view);
        setDefaultPathname(pathname);
      } catch {
        logout();
      }
    })();
  }, [data]);

  if (!isAccessTokenValid()) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (!defaultPathname) {
    return <AppLoading />;
  }

  return <Navigate to={defaultPathname} replace />;
}
