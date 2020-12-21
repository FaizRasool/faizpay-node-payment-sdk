class NumberFormatter {

    public static formatNumber(number: number) {
        
        return number.toFixed(2);

    }

    public static validateTwoDecimals(number: number) {
        const twoDecimalsRegex = /^[0-9]+\.[0-9]{2}$/;
        const numberAsString = (String)(number);

        if (twoDecimalsRegex.test(numberAsString)) {

            return true;

        } else {

            return false;

        }
    }

}

