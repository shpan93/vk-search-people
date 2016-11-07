import moment from 'moment';
import {dateFormat, hourFormat} from '../constants/index'
export function createDay(day = undefined) {
    return {
        date: moment(day),
        year: moment(day).year(),
        month: moment(day).format('MMMM'),
        // monthIndex is the month number obtained from moment, incremented by 1 to match node-calendar's format
        monthIndex: moment(day).month() + 1,
        weekIndex: moment(day).week(),
        dayIndex: moment(day).date(),
        time: moment(day).format(hourFormat),
        YMD:moment(day).format(dateFormat)
    }
}