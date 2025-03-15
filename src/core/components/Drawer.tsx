'use client';

import { classNames } from '@/core/utils/string';
import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Button } from './Button';

const Drawer = ({
  shouldScaleBackground = true,
  direction = 'left',
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    direction={direction}
    {...props}
  />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ className, children, ...restProps }, ref) => (
  <DrawerPrimitive.Trigger
    ref={ref}
    className={classNames('cursor-pointer', className)}
    {...restProps}
  >
    {children}
  </DrawerPrimitive.Trigger>
));
DrawerTrigger.displayName = 'DrawerTrigger';

const DrawerContent = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...restProps }, ref) => {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        className={classNames('fixed inset-0 z-40 bg-black/20', className)}
      />
      <DrawerPrimitive.Content
        ref={ref}
        className={classNames(
          'fixed z-40 left-0',
          'top-header',
          'w-96 max-w-[85vw] h-[calc(100vh-48px)]',
          'py-5 px-4',
          'bg-gray-100 dark:bg-gray-700',
          'overflow-y-auto',
          'border-r border-gray-300 dark:border-gray-700',
          'flex flex-col',
          className,
        )}
        {...restProps}
      >
        {/* We don't have drawer title or description yet, just put it here to avoid console error saying Title is required */}
        <DrawerPrimitive.Title />
        <DrawerPrimitive.Description />
        <DrawerPrimitive.Close asChild>
          <Button
            variant='ghost-secondary'
            pill
            square
            className='absolute top-3 right-3'
            aria-label='close'
          >
            <X />
          </Button>
        </DrawerPrimitive.Close>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});
DrawerContent.displayName = 'DrawerContent';

export { Drawer, DrawerTrigger, DrawerContent };
