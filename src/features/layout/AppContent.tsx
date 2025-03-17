import { classNames } from '@/core/utils/string';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AppContent = ({ children, className }: Props) => {
  return (
    <div className={classNames('flex-1 w-full px-4 md:px-6 lg:px-10 py-20', className)}>
      {children}
    </div>
  );
};
