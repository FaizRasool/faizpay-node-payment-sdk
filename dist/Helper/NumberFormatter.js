"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormatter = void 0;
class NumberFormatter {
    static formatNumber(number) {
        return number.toFixed(2);
    }
    static validateTwoDecimals(number) {
        const twoDecimalsRegex = /^[0-9]+\.[0-9]{2}$/;
        if (twoDecimalsRegex.test(number)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.NumberFormatter = NumberFormatter;
