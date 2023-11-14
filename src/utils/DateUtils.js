
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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * date to format of HH:mm
 */
export function dateToShortIsoTime(date) {
    return `${date.getHours()}:${date.getMinutes()}`;
}