import { forwardRef } from 'react';
import { classNames } from '../utils/string';
import { InputLabel } from './InputLabel';
import { InputMessage } from './InputMessage';

type Props = Omit<React.ComponentProps<typeof InputLabel>, 'children'> & {
  children?: React.ReactNode;
  error?: boolean;
  message?: string;
  label?: React.ReactNode;
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const InputContainer = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      error,
      message,
      label,
      className,
      prefix,
      suffix,
      disabled,
      required,
      htmlFor,
      style,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(className, disabled && 'cursor-default opacity-50')}
        style={style}
      >
        {!!label && (
          <InputLabel htmlFor={htmlFor} required={required}>
            {label}
          </InputLabel>
        )}

        <div
          className={classNames(
            'w-full',
            'flex items-center gap-2',
            'rounded border border-theme-gray-400 overflow-hidden',
            'px-3 py-1.5',
            '[&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-theme-gray-600',
            error
              ? 'border-red-500'
              : 'focus-within:border-theme-gray-600 group-data-[state=open]:border-theme-gray-600',
          )}
        >
          {!!prefix && <div className='shrink-0 flex items-center justify-center'>{prefix}</div>}
          {children}
          {!!suffix && (
            <div className='shrink-0 ml-auto flex items-center justify-center'>{suffix}</div>
          )}
        </div>

        {message && <InputMessage error={error}>{message}</InputMessage>}
      </div>
    );
  },
);
InputContainer.displayName = 'InputContainer';
