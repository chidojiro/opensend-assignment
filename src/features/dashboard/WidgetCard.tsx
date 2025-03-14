import { classNames } from '@/core/utils/string';
import { useRef, useState } from 'react';
import { Widget } from './types';
import { WidgetDialog } from './WidgetDialog';

type Props = {
  className?: string;
  widget: Widget;
};

export const WidgetCard = ({ widget, className, ...restProps }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickTrackStart = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDialogOpen(true);
    }, 50);
  };

  const handleClickTrackEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      <WidgetDialog widget={widget} open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <button
        type='button'
        {...restProps}
        className={classNames(
          'w-full h-full border border-gray-300 rounded-xl shadow p-2 sm:p-4',
          className,
        )}
        // HACK: onClick won't work normally when the widget is inside grid layout
        // so we need to use mouse events and timeout to manually detect a click
        onMouseDown={handleClickTrackStart}
        onTouchStart={handleClickTrackStart}
        onMouseMove={handleClickTrackEnd}
        onTouchMove={handleClickTrackEnd}
      >
        <h3 className='text-lg md:text-2xl font-medium text-center'>{widget.title}</h3>
        <p className='text-gray-500 text-center'>{widget.description}</p>
      </button>
    </>
  );
};

WidgetCard.displayName = 'WidgetCard';
