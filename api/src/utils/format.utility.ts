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
