import { AppHeader } from './AppHeader';
import { AppLogo } from './AppLogo';
import { ContentCard } from './ContentCard';

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <div className='flex-1 w-full px-4 max-w-lg mx-auto mt-20 flex flex-col items-center gap-4'>
        <AppLogo />
        <ContentCard>{children}</ContentCard>
      </div>
    </>
  );
};
