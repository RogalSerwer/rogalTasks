export function parseDniDay(interval, time, date, waga) {
    return { type: "daily", interval, time, date, waga }
}

export function parseDniWeek(dniTygodnia, interval, waga) {
    var temp = []
    dniTygodnia.forEach((dzien) => {
        if (dzien.check) {
            var [hour, minute] = dzien.hour.split(':').map(Number);
            temp.push({ id: dzien.id, hour, minute })
        }
    })
    return { type: "weekly", interval, days: temp, waga }
}
