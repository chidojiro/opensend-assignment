import { classNames } from '@/core/utils/string';

type Props = {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
};

export const InputMessage = ({ children, className, error }: Props) => {
  return <p className={classNames(className, error && 'text-red-500')}>{children}</p>;
};
