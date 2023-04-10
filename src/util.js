import dayjs from 'dayjs'

export function getMonth(month = dayjs().month()) {
    const year = dayjs().year()
    const firstDayOfTheMounth = dayjs(new Date(year, month, 1)).day()
    let currentMonthCount = 0 - firstDayOfTheMounth
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })
    return daysMatrix
}

export function currentDay (day) {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'currentDay' : ''
}