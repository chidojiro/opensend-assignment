import { classNames } from '@/core/utils/string';
import { noop } from 'lodash-es';
import { forwardRef, useId } from 'react';
import { InputContainer } from './InputContainer';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> &
  Omit<React.ComponentProps<typeof InputContainer>, 'children'> & {
    inputClassName?: string;
  };

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      error,
      message,
      label,
      disabled,
      prefix,
      suffix,
      required,
      onBlur,
      onChange = noop,
      id: idProp,
      value = '',
      inputClassName,
      ...restProps
    },
    ref,
  ) => {
    const internalId = useId();
    const id = idProp || internalId;

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const trimmedValue = value.trim();

      event.target.value = trimmedValue;

      if (trimmedValue !== value) {
        onChange?.(event);
      }

      onBlur?.(event);
    };

    return (
      <InputContainer
        label={label}
        error={error}
        message={message}
        className={className}
        disabled={disabled}
        prefix={prefix}
        suffix={suffix}
        required={required}
        htmlFor={id}
      >
        <input
          ref={ref}
          id={id}
          height={14}
          className={classNames(
            'block',
            'w-full',
            'focus-visible:outline-none',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            inputClassName,
          )}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={onChange}
          value={value}
          {...restProps}
        />
      </InputContainer>
    );
  },
);
Input.displayName = 'Input';
