import { Eye, EyeClosed } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Input } from './Input';

type Props = React.ComponentProps<typeof Input>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  props,
  ref,
) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      type={isRevealed ? 'text' : 'password'}
      suffix={
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setIsRevealed((s) => !s);
          }}
        >
          {isRevealed ? <Eye /> : <EyeClosed />}
        </button>
      }
    />
  );
});
