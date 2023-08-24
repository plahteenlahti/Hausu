export function calculatePercentageIncrease(a: number, b: number): number {
  if (b === 0) {
    return 0;
  }

  return ((a - b) / b) * 100;
}

export function numberToShortFormat(num: number): string {
  if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "m";
  } else if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}
