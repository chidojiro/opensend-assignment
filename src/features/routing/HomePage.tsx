import { Navigate, useLoaderData } from 'react-router-dom';
import { HomePageLoaderData } from './loaders';

export default function HomePage() {
  const loaderData = useLoaderData() as HomePageLoaderData;

  return <Navigate to={loaderData.defaultPathname} replace />;
}
