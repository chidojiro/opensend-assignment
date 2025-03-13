import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { classNames } from '@/core/utils/string';
import { Loader2Icon } from 'lucide-react';
import { forwardRef } from 'react';

const buttonVariants = cva(
  classNames(
    'inline-flex items-center justify-center gap-2',
    'transition-colors cursor-pointer',
    'rounded border border-transparent',
    'whitespace-nowrap font-medium',
    'h-10 px-4 text-lg',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        'solid-primary': 'bg-primary text-white hover:bg-primary/85',
        'outline-secondary': 'border-gray-400 hover:text-black/75',
      },
    },
    defaultVariants: {
      variant: 'solid-primary',
    },
  },
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      variant,
      asChild = false,
      type = 'button',
      loading,
      disabled,
      children,
      ...restProps
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        type={type}
        className={classNames(buttonVariants({ variant, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...restProps}
      >
        {loading && <Loader2Icon className='size-4 animate-spin' />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
