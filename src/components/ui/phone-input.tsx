import * as React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

export interface PhoneInputProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type'> {
  countryCode?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ countryCode = '+91', ...props }, ref) => {
    return (
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>{countryCode}</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="tel" autoComplete="tel" ref={ref} {...props} maxLength={10} />
      </InputGroup>
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
