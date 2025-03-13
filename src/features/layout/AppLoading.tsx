import { Loader2 } from 'lucide-react';

export const AppLoading = () => {
  return (
    <div className='flex justify-center items-center mt-20 text-gray-500'>
      <Loader2 className='animate-spin' size={48} />
    </div>
  );
};
