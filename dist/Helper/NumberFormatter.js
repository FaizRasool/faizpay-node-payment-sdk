"use strict";
class NumberFormatter {
    static formatNumber(number) {
        return number.toFixed(2);
    }
    static validateTwoDecimals(number) {
        const twoDecimalsRegex = /^[0-9]+\.[0-9]{2}$/;
        const numberAsString = (String)(number);
        if (twoDecimalsRegex.test(numberAsString)) {
            return true;
        }
        else {
            return false;
        }
    }
}
