import { AppHeader } from './AppHeader';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <main className='bg-gray-100 flex flex-col min-h-screen'>
      <AppHeader />
      <div className='flex-1 px-4'>{children}</div>
    </main>
  );
};
