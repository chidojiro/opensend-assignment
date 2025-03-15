import { classNames } from '@/core/utils/string';
import { useRef, useState } from 'react';
import { useProfileQuery } from '@/features/auth/rtkApis';
import { Widget } from './types';
import { WidgetDialog } from './WidgetDialog';

type Props = {
  children: React.ReactNode;
  className?: string;
  widget: Widget;
};

export const WidgetCardContainer = ({ children, className, widget, ...restProps }: Props) => {
  const { data: profile } = useProfileQuery();
  const isAdmin = profile?.view.type === 'ADMIN';

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mouseDownTimeRef = useRef<number>(0);

  const handleClickTrackStart = () => {
    mouseDownTimeRef.current = Date.now();
  };

  const handleMouseUp = () => {
    if (mouseDownTimeRef.current) {
      const time = Date.now() - mouseDownTimeRef.current;

      if (time < 150) {
        setIsDialogOpen(true);
      }
    }
  };

  const containerClassName = classNames(
    'flex flex-col w-full h-full border border-gray-300 rounded-xl shadow p-2 sm:p-4',
    className,
  );

  if (isAdmin) {
    return (
      <>
        <WidgetDialog widget={widget} open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        <button
          type='button'
          className={containerClassName}
          // HACK: onClick won't work normally when the widget is inside grid layout
          // It is also triggered when the widget is dropped
          // so we need to track time between mouse down and mouse up to detect a click
          onMouseDown={handleClickTrackStart}
          onTouchStart={handleClickTrackStart}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          {...restProps}
        >
          {children}
        </button>
      </>
    );
  }

  return (
    <div className={containerClassName} {...restProps}>
      {children}
    </div>
  );
};
