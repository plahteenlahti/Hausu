export function formatPrice(num: number): string {
  return num.toLocaleString("fi-FI").replace(/,/g, " ");
}
