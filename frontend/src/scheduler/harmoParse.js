import { getYMD, getHours, getDiff } from "./parseUtils";


function HarmoDailyParser(entry, currentWeek, currentWeekEnd, start, numHours) {
    const daysElements = [[], [], [], [], [], [], []];
    const s = new Date(entry.lastAdded)
    const [year, month, day] = getYMD(s);
    const [hour, minute] = entry.dni.time.split(":").map(Number)
    const [hourRowStartVal, hourRowStart, hourRowEndVal, hourRowEnd] = getHours(hour, minute, entry["waga"]);

    if (hourRowStartVal >= start && hourRowEndVal <= start + numHours * 100 + 100) {
        const start = new Date(year, month, day);
        let startThisWeek;
        const interval = parseInt(entry.dni.interval);
        if (start < currentWeek) {
            const diff = getDiff(currentWeek, start, interval);
            if (diff != 0)
                startThisWeek = ((interval - diff));
            else
                startThisWeek = diff;
        }
        else if (start <= currentWeekEnd) {
            console.log(entry);
            const s1 = new Date(entry.dni.date)
            const [year1, month1, day1] = getYMD(s1);
            const dateStart = new Date(year1, month1, day1);
            if (s1>s)
                startThisWeek = (dateStart.getDay() + 6) % 7;
            else
                startThisWeek = (start.getDay() + 6) % 7;
        }
        else return;
        let days = [startThisWeek];
        while (days[days.length - 1] + interval < 7) days.push(days[days.length - 1] + interval);
        days.forEach((day) => {
            daysElements[day].push({ name: entry.nazwa, hourRowStart, hourRowEnd })
        })
        return daysElements;
    }
}

function HarmoWeekParser(entry, currentWeek, start, numHours) {
    const daysElements = [[], [], [], [], [], [], []];
    var pass = true;
    if (entry.dni.interval > 1) {
        const temp = new Date(entry.lastAdded);
        const s = new Date(temp - ((temp.getDay() + 6) % 7) * 1000 * 60 * 60 * 24)
        const [year, month, day] = getYMD(s);
        const diff = getDiff(
            currentWeek, 
            new Date(year, month, day), 
            parseInt(entry.dni.interval) * 7
        );
        pass = diff == 0;

    }
    if (pass)
    {
        entry.dni.days.forEach((day) => {
            const [hourRowStartVal, hourRowStart, hourRowEndVal, hourRowEnd] = getHours(day.hour, day.minute, entry["waga"]);
            if (hourRowStartVal >= start && hourRowEndVal <= start + numHours * 100 + 100)
                daysElements[day.id].push({ name: entry.nazwa, hourRowStart, hourRowEnd });
        })
        return daysElements;
    }
}

export function HarmoParserFactory(currentWeek, currentWeekEnd, start, numHours) {
    function HarmoDailyAdapter(entry) {
        return HarmoDailyParser(entry, currentWeek, currentWeekEnd, start, numHours)
    }
    function HarmoWeekAdapter(entry) {
        return HarmoWeekParser(entry, currentWeek, start, numHours)
    }
    return {daily: HarmoDailyAdapter, weekly: HarmoWeekAdapter}
}
