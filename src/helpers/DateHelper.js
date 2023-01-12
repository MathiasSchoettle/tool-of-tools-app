let DateHelper = {
    getWeekOfDayName: function(date) {
        return  this.WEEKDAY_NAMES[date.isoWeekday()];
    },

    appendZero: function(number) {
        return ('0' + number).slice(-2);
    },

    WEEKDAY_NAMES: {
        1: 'Mo',
        2: 'Di',
        3: 'Mi',
        4: 'Do',
        5: 'Fr',
        6: 'Sa',
        7: 'So',
    }
}



export default DateHelper;
