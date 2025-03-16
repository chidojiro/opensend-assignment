'use client';

import { classNames } from '@/core/utils/string';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from './Button';

export const Dialog = DialogPrimitive.Root;

export const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...restProps }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={classNames(
        'fixed z-50 inset-0',
        'bg-black/20',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      )}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={classNames(
        [
          'fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
          'w-[1024px] max-w-[calc(100%-2rem)]',
          'border border-gray-300 dark:border-gray-600 shadow-lg rounded-xl',
          'bg-gray-100 dark:bg-gray-700',
          'duration-200',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        ].join(' '),
        className,
      )}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      {...restProps}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export const DialogTrigger = DialogPrimitive.Trigger;

type DialogHeaderProps = {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export const DialogHeader = ({
  className,
  title,
  description,
  ...restProps
}: DialogHeaderProps) => (
  <div className={classNames('p-2', className)} {...restProps}>
    <div className='flex items-center justify-end'>
      <DialogPrimitive.Close asChild>
        <Button variant='ghost-secondary' pill square>
          <X />
        </Button>
      </DialogPrimitive.Close>
    </div>
    <div className='flex flex-col items-center justify-center'>
      <DialogPrimitive.Title className='text-2xl font-bold'>{title}</DialogPrimitive.Title>
      <DialogPrimitive.Description className='text-gray-500'>
        {description}
      </DialogPrimitive.Description>
    </div>
  </div>
);
DialogHeader.displayName = 'DialogHeader';

type DialogBodyProps = {
  className?: string;
  children?: React.ReactNode;
};

export const DialogBody = ({ className, children, ...restProps }: DialogBodyProps) => (
  <div
    className={classNames('p-4 sm:p-8 md:px-12', 'max-h-[70vh] overflow-y-auto', className)}
    {...restProps}
  >
    {children}
  </div>
);
DialogBody.displayName = 'DialogBody';

type DialogFooterProps = {
  className?: string;
  children?: React.ReactNode;
};

export const DialogFooter = ({ className, children, ...restProps }: DialogFooterProps) => (
  <div
    className={classNames(
      'px-4 py-4 sm:px-8 sm:pb-8 md:px-12',
      'flex gap-4',
      '[&>*]:flex-1',
      className,
    )}
    {...restProps}
  >
    {children}
  </div>
);
DialogFooter.displayName = 'DialogFooter';
