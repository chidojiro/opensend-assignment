import { useProfileQuery } from '@/features/auth/rtkApis';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './constants';
import { View } from '@/features/auth/types';
import { AppLoading } from '@/features/layout/AppLoading';

type Props = {
  authorizedTypes: View['type'][];
};

export const AuthorizedOutlet = ({ authorizedTypes }: Props) => {
  const { data: profile, isFetching } = useProfileQuery(undefined);

  if (isFetching) {
    return <AppLoading />;
  }

  if (!profile) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (!authorizedTypes.includes(profile.view.type)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
};
