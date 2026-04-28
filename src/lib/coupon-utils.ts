export const formatDiscountValue = (discountType: string, discountValue: number): string => {
  if (discountType === 'PERCENTAGE') {
    return `${discountValue}%`;
  }
  return `₹${(discountValue / 100).toFixed(2)}`;
};

export const formatCouponUsage = (currentUses: number, maxTotalUses: number | null): string => {
  if (maxTotalUses === null) {
    return `${currentUses.toLocaleString()}`;
  }
  return `${currentUses}/${maxTotalUses}`;
};

export const getCouponStatus = (
  isActive: boolean,
  validFrom: string,
  validUntil: string | null,
  currentUses: number,
  maxTotalUses: number | null
): {
  status: 'active' | 'inactive' | 'scheduled' | 'expiring_soon' | 'expired' | 'limit_reached';
  label: string;
  variant: 'default' | 'destructive' | 'secondary' | 'outline';
} => {
  const now = new Date();
  const validFromDate = new Date(validFrom);
  const validUntilDate = validUntil ? new Date(validUntil) : null;

  if (!isActive) {
    return { status: 'inactive', label: 'Inactive', variant: 'destructive' };
  }

  if (maxTotalUses !== null && currentUses >= maxTotalUses) {
    return { status: 'limit_reached', label: 'Limit Reached', variant: 'outline' };
  }

  if (validFromDate > now) {
    return { status: 'scheduled', label: 'Scheduled', variant: 'secondary' };
  }

  if (validUntilDate && validUntilDate < now) {
    return { status: 'expired', label: 'Expired', variant: 'destructive' };
  }

  if (validUntilDate) {
    const daysUntilExpiry = Math.ceil(
      (validUntilDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilExpiry <= 7) {
      return { status: 'expiring_soon', label: 'Expiring Soon', variant: 'outline' };
    }
  }

  return { status: 'active', label: 'Active', variant: 'default' };
};

export const validateCouponCode = (code: string): { valid: boolean; error?: string } => {
  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Coupon code is required' };
  }

  if (code.length < 3 || code.length > 50) {
    return { valid: false, error: 'Coupon code must be between 3 and 50 characters' };
  }

  if (!/^[A-Z0-9_-]+$/i.test(code)) {
    return { valid: false, error: 'Coupon code can only contain letters, numbers, dashes, and underscores' };
  }

  return { valid: true };
};

export const validateDiscountValue = (
  discountType: 'PERCENTAGE' | 'FLAT',
  value: number
): { valid: boolean; error?: string } => {
  if (discountType === 'PERCENTAGE') {
    if (value < 1 || value > 100) {
      return { valid: false, error: 'Percentage discount must be between 1 and 100' };
    }
  } else if (discountType === 'FLAT') {
    if (value <= 0) {
      return { valid: false, error: 'Flat discount must be a positive amount' };
    }
  }

  return { valid: true };
};

export const calculateUsageProgress = (
  currentUses: number,
  maxTotalUses: number | null
): number => {
  if (maxTotalUses === null) return 0;
  return Math.min((currentUses / maxTotalUses) * 100, 100);
};

export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

export const rupeesToPaise = (rupees: number): number => {
  return Math.round(rupees * 100);
};

export const paiseToRupees = (paise: number): number => {
  return paise / 100;
};
