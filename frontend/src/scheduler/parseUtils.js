export const getYMD = (date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    return [year, month, day];
}

export const getHours = (hour, minute, weight) => {
    const hourRowStartVal = hour * 100 + minute;
    const hourRowStart = `g${hourRowStartVal}`
    const hourRowEndVal = hour * 100 + 100 * weight + minute;
    const hourRowEnd = `g${hourRowEndVal}`
    return [hourRowStartVal, hourRowStart, hourRowEndVal, hourRowEnd]
}

export const getDiff = (currentWeek, start, interval) => {
    return Math.round((currentWeek - start) / (24 * 60 * 60 * 1000)) % interval;
}