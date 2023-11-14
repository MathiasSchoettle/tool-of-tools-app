
export function monthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('en-US', { month: 'long' });
}

export function isWeekend(date) {
    return date.getDay() === 6 || date.getDay() === 0;
}

export function addDays(from, daysToAdd) {
    let date = new Date(from);
    date.setDate(date.getDate() + daysToAdd);
    return date;
}

export function sameDay(first, second) {
    return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
}

/**
 * date to format of YYYY-MM-DD
 */
export function dateToIsoString(date) {
    return `${ date.getFullYear() }-${ pad(date.getMonth() + 1) }-${ pad(date.getDate()) }`;
}

/**
 * date to format of HH:mm
 */
export function dateToShortIsoTime(date) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function pad(value) {
    return String(value).padStart(2, '0');
}