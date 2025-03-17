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
        'bg-theme-gray-50 border border-theme-gray-300 rounded-lg shadow',
        className,
      )}
    >
      <div className='p-5'>{children}</div>
      {footer && (
        <div className='bg-theme-gray-100 rounded-b-lg border-t border-theme-gray-300 p-1'>
          <p className='text-theme-gray-700 text-center'>{footer}</p>
        </div>
      )}
    </div>
  );
};
