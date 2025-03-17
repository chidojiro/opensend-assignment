import { classNames } from '@/core/utils/string';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AppContent = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        'max-h-[calc(100vh-var(--spacing-header))] w-full h-full flex-1',
        'overflow-y-scroll',
        'px-4 md:px-6 lg:px-10 py-10 lg:py-20',
        className,
      )}
    >
      <div className='max-w-7xl mx-auto'>{children}</div>
    </div>
  );
};
