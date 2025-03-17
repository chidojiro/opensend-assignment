import { classNames } from '@/core/utils/string';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ContentCard = ({ children, className }: Props) => {
  return (
    <div className={classNames('w-full bg-theme-gray-50 rounded-lg px-6 py-10 shadow', className)}>
      {children}
    </div>
  );
};
