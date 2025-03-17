import { classNames } from '@/core/utils/string';
import { Check, X } from 'lucide-react';
import { Widget } from '../types';
import { WidgetCardContainer } from './WidgetCardContainer';

type Props = {
  className?: string;
  widget: Widget;
};

export const WidgetCard = ({ widget, className, ...restProps }: Props) => {
  return (
    <>
      <WidgetCardContainer
        widget={widget}
        className={classNames('relative', className)}
        {...restProps}
      >
        <h3 className='text-xl md:text-2xl font-medium text-center leading-6'>{widget.title}</h3>
        <p className='text-theme-gray-500 text-center line-clamp-2 leading-5 mt-2'>
          {widget.description}
        </p>
        <div className='flex flex-col items-center justify-center mt-2'>
          <p className='text-theme-gray-500 flex items-baseline gap-1 text-lg'>
            <b>Preserve ratio:</b>
            {widget.preserveAspectRatio ? (
              <Check className='text-green-500 translate-y-0.5' size={16} />
            ) : (
              <X className='text-red-500 translate-y-0.5' size={16} />
            )}
          </p>
        </div>
      </WidgetCardContainer>
    </>
  );
};
WidgetCard.displayName = 'WidgetCard';
