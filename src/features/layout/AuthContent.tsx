import { AppLogo } from './AppLogo';
import { ContentCard } from './ContentCard';

export const AuthContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-1 max-w-md mx-auto mt-20 flex flex-col items-center gap-4'>
      <AppLogo />
      <ContentCard>{children}</ContentCard>
    </div>
  );
};
