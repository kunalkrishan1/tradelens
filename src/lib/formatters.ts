/**
 * Consistent number and currency formatting for SSR & Client hydration consistency.
 * Explicitly specifies 'en-US' locale to prevent server/client locale mismatch.
 */

export function formatNumber(
  val: number,
  options?: { minDecimals?: number; maxDecimals?: number }
): string {
  const minDecimals = options?.minDecimals ?? 2;
  const maxDecimals = options?.maxDecimals ?? 2;

  return val.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
}

export function formatPriceWithCurrency(
  val: number,
  currency: string = '$',
  options?: { minDecimals?: number; maxDecimals?: number }
): string {
  return `${currency}${formatNumber(val, options)}`;
}

