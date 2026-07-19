export function parseDniDay(interval, time, date) {
    return { type: "daily", interval: interval, time: time, date: date }
}

export function parseDniWeek(dniTygodnia, interval) {
    var temp = []
    dniTygodnia.forEach((dzien) => {
        if (dzien.check) {
            var [hour, minute] = dzien.hour.split(':').map(Number);
            temp.push({ id: dzien.id, hour: hour, minute: minute })
        }
    })
    return { type: "weekly", interval: interval, days: temp }
}
