import { Loader2 } from 'lucide-react';

export const AppLoading = () => {
  return (
    <div className='flex justify-center items-center text-3xl text-theme-gray-500'>
      <Loader2 className='animate-spin' size={48} />
    </div>
  );
};
