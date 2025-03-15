import { classNames } from '@/core/utils/string';
import { Widget, WidgetLayoutBreakpoint } from './types';
import { WidgetCardContainer } from './WidgetCardContainer';
import { Check, X } from 'lucide-react';

type Props = {
  className?: string;
  widget: Widget;
  breakpoint: WidgetLayoutBreakpoint;
};

export const WidgetCard = ({ widget, className, breakpoint, ...restProps }: Props) => {
  return (
    <>
      <WidgetCardContainer
        widget={widget}
        className={classNames('relative', className)}
        {...restProps}
      >
        <h3 className='text-xl md:text-2xl font-medium text-center'>{widget.title}</h3>
        <p className='text-gray-500 text-center line-clamp-2'>{widget.description}</p>
        <div className='flex flex-col items-center justify-center mt-4'>
          <p className='text-gray-500'>
            <b>Default:</b> {widget.defaultSize[breakpoint]}
          </p>
          <p className='text-gray-500 flex items-baseline gap-1'>
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
