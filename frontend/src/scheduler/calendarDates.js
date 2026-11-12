import { useState } from 'react'

const getCurrentWeekTimes = (numHours, start) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startOfThisWeek = new Date(now - ((now.getDay() + 6) % 7) * 1000 * 60 * 60 * 24);
    const endOfThisWeek = new Date(now - ((now.getDay() + 6) % 7 - 6) * 1000 * 60 * 60 * 24);
    return [startOfThisWeek, endOfThisWeek]
}

export function onCalendarProcess() {

    const numHours = 17;
    const start = 600;
    const [startOfThisWeek, endOfThisWeek] = getCurrentWeekTimes(numHours, start);
    const [currentWeek, setCurrentWeek] = useState(startOfThisWeek);
    const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfThisWeek);

    const weekForward = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + 7)
        const newEndWeek = new Date(currentWeek);
        newEndWeek.setDate(newEndWeek.getDate() + 13)
        setCurrentWeek(newWeek);
        setCurrentWeekEnd(newEndWeek);
    }
    const weekBackward = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() - 7)
        const newEndWeek = new Date(currentWeek);
        newEndWeek.setDate(newEndWeek.getDate() - 1)
        setCurrentWeek(newWeek);
        setCurrentWeekEnd(newEndWeek);
    }

    return {numHours, start, currentWeek, currentWeekEnd, weekForward, weekBackward}
}