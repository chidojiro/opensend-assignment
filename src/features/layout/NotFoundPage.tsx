import { SearchX } from 'lucide-react';
import { AppHeader } from './AppHeader';
import { PageTitle } from './PageTitle';
import { Link } from 'react-router';
import { ROUTES } from '../routing/constants';
import { Button } from '@/core/components/Button';

export default function NotFoundPage() {
  return (
    <>
      <AppHeader />
      <div className='flex-1 flex flex-col items-center px-4 md:px-6 lg:px-10 py-10'>
        <PageTitle>Page not found!</PageTitle>
        <div className='flex flex-col items-center justify-center h-full'>
          <SearchX size={96} />
        </div>
        <Link to={ROUTES.HOME} className='text-2xl underline'>
          <Button variant='outline-secondary' className='mt-4'>
            Go to home
          </Button>
        </Link>
      </div>
    </>
  );
}
