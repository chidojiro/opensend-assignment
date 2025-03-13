import { classNames } from '@/core/utils/string';

type Props = {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  htmlFor?: string;
};

export const InputLabel = ({ children, className, required, htmlFor }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames('w-fit', 'flex items-center gap-1', 'mb-1.5', className)}
    >
      <span>
        {children}
        {required && <span className='text-danger-base'>*</span>}
      </span>
    </label>
  );
};
