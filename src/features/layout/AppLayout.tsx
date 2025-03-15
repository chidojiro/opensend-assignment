import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <main className='bg-gray-100 dark:bg-gray-800 flex flex-col min-h-screen max-w-screen'>
      <Outlet />
    </main>
  );
};
