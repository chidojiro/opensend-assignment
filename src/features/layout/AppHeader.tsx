import { logout } from '@/features/auth/utils';
import { AppSidebarButton } from './AppSidebarButton';
import { Moon, SunMedium } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { toggleDarkMode } from '@/core/utils/theme';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/features/routing/constants';

type Props = {
  authenticated?: boolean;
};

export const AppHeader = ({ authenticated }: Props) => {
  return (
    <header className='sticky z-header top-0 flex items-center justify-between bg-theme-gray-300 h-12 px-4 py-1.5'>
      <div className='flex items-center'>
        {authenticated && <AppSidebarButton />}
        {authenticated ? (
          <Link to={ROUTES.HOME}>
            <AppLogo />
          </Link>
        ) : (
          <AppLogo />
        )}
      </div>
      <div className='flex items-center gap-4'>
        <button
          type='button'
          className='flex items-center justify-center w-7 h-7 bg-theme-gray-900/10 rounded-full'
          onClick={toggleDarkMode}
        >
          <SunMedium className='dark:hidden' size={16} />
          <Moon className='hidden dark:block' size={16} />
        </button>
        {authenticated && (
          <button type='button' className='hover:underline font-medium text-lg' onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
