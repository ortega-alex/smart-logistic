import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import es from 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.locale(es);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

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
export const getDateFormat = (date: Dayjs | string, format?: string): string =>
    dayjs(date ?? undefined).format(format || 'DD/MM/YYYY HH:MM');

/**
 * Duration Between Date And Current Date
 * @param {Date} starDate if it is not provided, put the current date
 * @param {Date} endDate if it is not provided, put the current date
 * @returns {String}
 */
export const durationInDaysBetweenDateHumanize = (starDate?: Dayjs, endDate?: Dayjs): string =>
    dayjs.duration(dayjs(endDate ?? undefined).diff(starDate ?? undefined)).humanize();
