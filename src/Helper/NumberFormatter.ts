class NumberFormatter {

    public static formatNumber(number: number) {
        
        return number.toFixed(2);

    }

    public static validateTwoDecimals(number: string) {
        const twoDecimalsRegex = /^[0-9]+\.[0-9]{2}$/;

        if (twoDecimalsRegex.test(number)) {

            return true;

        } else {

            return false;

        }
    }

}

export { NumberFormatter };