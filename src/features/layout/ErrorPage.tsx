import { Button } from '@/core/components/Button';
import { Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routing/constants';
import { AppHeader } from './AppHeader';
import { PageTitle } from './PageTitle';
import { AppLayout } from './AppLayout';

export default function ErrorPage() {
  return (
    <AppLayout>
      <AppHeader />
      <div className='flex-1 flex flex-col items-center px-4 md:px-6 lg:px-10 py-10'>
        <PageTitle>An error occurred!</PageTitle>
        <div className='flex flex-col items-center justify-center h-full'>
          <Bug size={96} />
        </div>
        <Link to={ROUTES.HOME} className='text-2xl underline'>
          <Button variant='outline-secondary' className='mt-4'>
            Go to home
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}
