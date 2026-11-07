import * as React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type'> {
  countryCode?: string;
  groupClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, groupClassName, countryCode = '+91', ...props }, ref) => {
    return (
      <InputGroup className={groupClassName}>
        <InputGroupAddon>
          <InputGroupText>{countryCode}</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          type="tel"
          autoComplete="tel"
          className={cn('pl-0.5!', className)}
          ref={ref}
          {...props}
          maxLength={10}
        />
      </InputGroup>
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
