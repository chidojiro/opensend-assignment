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
      className={classNames('w-fit', 'font-medium', 'flex items-center gap-1', className)}
    >
      <span>
        {children}
        {required && <span className='text-red-500'>*</span>}
      </span>
    </label>
  );
};
