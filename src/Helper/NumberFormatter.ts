class NumberFormatter {
  public static formatNumber(numberInput: string): string {
    const asNumber = parseFloat(numberInput).toFixed(2);

    return String(asNumber);
  }

  public static validateTwoDecimals(numberInput: string): boolean {
    const twoDecimalsRegex = /^[0-9]+\.[0-9]{2}$/;

    if (twoDecimalsRegex.test(numberInput)) {
      return true;
    } else {
      return false;
    }
  }
}

export { NumberFormatter };
