import { classNames } from '@/core/utils/string';

type Props = {
  className?: string;
};

export const Separator = ({ className }: Props) => {
  return (
    <div
      className={classNames('w-full border-b border-gray-300 dark:border-gray-700', className)}
    />
  );
};
