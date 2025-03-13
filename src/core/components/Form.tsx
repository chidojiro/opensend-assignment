import { type FieldValues, FormProvider, type UseFormReturn } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

export function Form<T extends FieldValues>({ form, children, onSubmit, className }: Props<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={className}
        data-error={Object.values(form.formState.errors).length > 0}
      >
        {children}
      </form>
    </FormProvider>
  );
}
