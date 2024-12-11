/**
 * number separated by commas, returns two decimal places
 * @param {String | Number} number
 * @returns {Number}
 */
export const commaSeparateNumber = (number: string | number): string => {
    number = parseFloat(String(number)).toFixed(2);
    while (/(\d+)(\d{3})/.test(number)) {
        number = String(number).replace(/(\d+)(\d{3})/, '$1,$2');
    }
    return number;
};

/**
 *
 * @param {String} stringValue
 * @returns {Boolean}
 */
export const stringToBoolean = (stringValue: string): boolean => {
    switch (stringValue?.toLowerCase()?.trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true;

        case 'false':
        case 'no':
        case '0':
        case null:
        case undefined:
            return false;

        default:
            return JSON.parse(stringValue);
    }
};
