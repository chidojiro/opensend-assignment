import { Outlet } from 'react-router';
import { AppHeader } from './AppHeader';

export const AppLayout = () => {
  return (
    <main className='bg-gray-100 flex flex-col min-h-screen'>
      <AppHeader />
      <div className='flex-1 px-4'>
        <Outlet />
      </div>
    </main>
  );
};
