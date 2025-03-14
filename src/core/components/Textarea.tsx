import { classNames } from '@/core/utils/string';
import { noop } from 'lodash-es';
import { forwardRef, useId } from 'react';
import { InputContainer } from './InputContainer';

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix' | 'suffix'> &
  Omit<React.ComponentProps<typeof InputContainer>, 'children'> & {
    inputClassName?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
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

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
        <textarea
          ref={ref}
          id={id}
          className={classNames(
            'block',
            'w-full',
            'focus-visible:outline-none',
            'resize-y',
            'min-h-20',
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
Textarea.displayName = 'Textarea';
