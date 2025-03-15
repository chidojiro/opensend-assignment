import { AppHeader } from './AppHeader';

type Props = {
  children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: Props) => {
  return (
    <>
      <AppHeader authenticated />
      <div className='flex-1 px-4 md:px-6 lg:px-10 py-4 md:py-10'>{children}</div>
    </>
  );
};
