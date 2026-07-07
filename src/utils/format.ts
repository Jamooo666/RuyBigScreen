export function formatNumber(value: number, dec = 0): string {
  if (dec > 0) return value.toFixed(dec)
  return Math.floor(value).toLocaleString()
}
