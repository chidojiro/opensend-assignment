import { PageTitle } from '@/features/layout/PageTitle';
import { Construction } from 'lucide-react';

export default function OnboardingPage() {
  return (
    <>
      <PageTitle>Onboarding</PageTitle>
      <div className='flex flex-col items-center justify-center h-full'>
        <Construction size={96} />
        <p className='text-xl font-medium'>Under construction!</p>
      </div>
    </>
  );
}
