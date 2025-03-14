import { classNames } from '../utils/string';

type Props = {
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = ({ children, className, footer }: Props) => {
  return (
    <div className={classNames('bg-white border border-gray-300 rounded-lg shadow', className)}>
      <div className='p-5'>{children}</div>
      {footer && (
        <div className='bg-gray-100 rounded-b-lg border-t border-gray-300 p-1'>
          <p className='text-gray-700 text-center'>{footer}</p>
        </div>
      )}
    </div>
  );
};
