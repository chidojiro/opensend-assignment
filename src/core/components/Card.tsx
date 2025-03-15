import { classNames } from '../utils/string';

type Props = {
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = ({ children, className, footer }: Props) => {
  return (
    <div
      className={classNames(
        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-lg shadow',
        className,
      )}
    >
      <div className='p-5'>{children}</div>
      {footer && (
        <div className='bg-gray-100 dark:bg-gray-700 rounded-b-lg border-t border-gray-300 dark:border-gray-700 p-1'>
          <p className='text-gray-700 dark:text-gray-400 text-center'>{footer}</p>
        </div>
      )}
    </div>
  );
};
