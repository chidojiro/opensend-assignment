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

export const WidgetCardContainer = ({ children, className, widget }: Props) => {
  const { data: profile } = useProfileQuery();
  const isAdmin = profile?.view.type === 'ADMIN';

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickTrackStart = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDialogOpen(true);
    }, 50);
  };

  const handleInvalidateClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
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
          // so we need to use mouse events and timeout to manually detect a click
          onMouseDown={handleClickTrackStart}
          onTouchStart={handleClickTrackStart}
          onMouseMove={handleInvalidateClick}
          onTouchMove={handleInvalidateClick}
        >
          {children}
        </button>
      </>
    );
  }

  return <div className={containerClassName}>{children}</div>;
};
