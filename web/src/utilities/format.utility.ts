import dayjs, { Dayjs } from 'dayjs';

/**
 * Capital Letter First Letter
 * @param {String} text
 * @returns {String}
 */
export const CapitalizeTheFirstLetter = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

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
 * @param {String} text
 * @param {String} formatReq
 * @returns {Dayjs}
 */
export const getDateFromString = (text: string, format?: string): Dayjs => dayjs(dayjs(text, format || 'YYYY/MM/DD'));

/**
 *
 * @param {Dayjs} date
 * @param {String} format
 * @returns {String}
 */
export const getDateFormat = (date: Dayjs, format?: string): string => dayjs(date ?? undefined).format(format || 'DD/MM/YYYY HH:MM');
