import { Drawer, DrawerContent } from '@/core/components/Drawer';
import { ROUTES } from '@/features/routing/constants';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProfileQuery } from '@/features/auth/rtkApis';
import { classNames } from '@/core/utils/string';

type NavConfig = {
  label: string;
  href: string;
};

export const AppSidebarButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile } = useProfileQuery();

  const handleClose = () => setIsOpen(false);

  const isAdmin = profile?.view?.type === 'ADMIN';

  const NAV_CONFIG = [
    isAdmin && {
      label: 'Admin',
      href: ROUTES.ADMIN,
    },
    {
      label: 'Onboarding',
      href: ROUTES.ONBOARDING,
    },
    {
      label: 'Dashboard',
      href: ROUTES.DASHBOARD,
    },
  ].filter(Boolean) as NavConfig[];

  return (
    <>
      <button type='button' className='cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
        <Menu />
      </button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className='flex flex-col gap-4'>
            {NAV_CONFIG.map((nav) => (
              <NavLink
                key={nav.href}
                to={nav.href}
                onClick={handleClose}
                className={({ isActive }) =>
                  classNames(
                    'text-xl font-medium',
                    isActive ? 'font-bold underline' : 'hover:underline',
                  )
                }
              >
                {nav.label}
              </NavLink>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
