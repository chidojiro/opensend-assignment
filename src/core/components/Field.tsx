import { get } from 'lodash-es';
import { type RegisterOptions, useController, useFormContext } from 'react-hook-form';

type FieldOwnProps<TComponentProps, TValue> = {
  component: React.ComponentType<TComponentProps>;
  name: string;
  rules?: RegisterOptions;
  value?: TValue;
  className?: string;
  message?: string;
};

export type FieldProps<TComponentProps, TValue> = FieldOwnProps<TComponentProps, TValue> &
  Omit<TComponentProps, keyof FieldOwnProps<TComponentProps, TValue>>;

export const Field = <TComponentProps, TValue>({
  component: Component,
  name,
  rules,
  className,
  value: valueProp,
  message,
  ...restProps
}: FieldProps<TComponentProps, TValue>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const {
    field: { value, ...restField },
  } = useController({ name, rules, control });

  const error = get(errors, name);

  const hasError = !!error || undefined;

  return (
    <Component
      error={hasError}
      message={error?.message ?? message}
      className={className}
      value={value}
      checked={value === valueProp || value?.toString() === 'true'}
      {...restField}
      {...(restProps as TComponentProps)}
    />
  );
};
