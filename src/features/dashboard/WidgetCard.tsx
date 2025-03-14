import { forwardRef } from 'react';
import { Widget } from './types';
import { classNames } from '@/core/utils/string';

type Props = {
  className?: string;
  widget: Widget;
};

export const WidgetCard = forwardRef<HTMLDivElement, Props>(
  ({ widget: { title, description }, className, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        {...restProps}
        className={classNames(
          'w-full h-full border border-gray-300 rounded-xl shadow p-4',
          className,
        )}
      >
        <h3 className='text-2xl font-medium text-center'>{title}</h3>
        <p className='text-gray-500 text-center'>{description}</p>
      </div>
    );
  },
);

WidgetCard.displayName = 'WidgetCard';
