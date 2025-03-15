import { Construction } from 'lucide-react';

export const UnderConstruction = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Construction size={96} />
      <p className='text-xl font-medium'>Under construction!</p>
    </div>
  );
};
