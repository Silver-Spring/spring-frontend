export const formatAmount = (amountInPaise: number, currency = 'INR'): string => {
  const amount = amountInPaise / 100;

  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return amount.toFixed(2);
};

export const getDateRangeTimestamps = (
  range: string
): { from: number; to: number } | null => {
  const now = Math.floor(Date.now() / 1000);

  switch (range) {
    case 'allTime':
      return null;

    case 'today': {
      const startOfDay = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
      return { from: startOfDay, to: now };
    }

    case 'yesterday': {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const startOfYesterday = Math.floor(yesterday.setHours(0, 0, 0, 0) / 1000);
      const endOfYesterday = Math.floor(yesterday.setHours(23, 59, 59, 999) / 1000);
      return { from: startOfYesterday, to: endOfYesterday };
    }

    case 'last7days':
      return { from: now - 7 * 24 * 60 * 60, to: now };

    case 'last30days':
      return { from: now - 30 * 24 * 60 * 60, to: now };

    case 'thisMonth': {
      const startOfMonth = Math.floor(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000
      );
      return { from: startOfMonth, to: now };
    }

    case 'lastMonth': {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const startOfLastMonth = Math.floor(
        new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).getTime() / 1000
      );
      const endOfLastMonth = Math.floor(
        new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0, 23, 59, 59).getTime() /
          1000
      );
      return { from: startOfLastMonth, to: endOfLastMonth };
    }

    default:
      return { from: now - 30 * 24 * 60 * 60, to: now };
  }
};

export const getPaymentStatusColor = (
  status: string
): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (status?.toLowerCase()) {
    case 'captured':
    case 'processed':
      return 'default';
    case 'failed':
      return 'destructive';
    case 'authorized':
    case 'pending':
      return 'secondary';
    case 'refunded':
      return 'outline';
    case 'created':
      return 'secondary';
    default:
      return 'secondary';
  }
};
