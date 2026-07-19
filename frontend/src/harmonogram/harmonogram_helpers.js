export class Dzien {
    static counter = 0;
    constructor({ nazwa, hour = "12:00", check = false, id } = {}) {
        this.id = id ?? Dzien.counter++;
        this.nazwa = nazwa;
        this.hour = hour;
        this.check = check;
    }
    copy(changes = {}) {
        return new Dzien({
            id: this.id,
            nazwa: this.nazwa,
            hour: this.hour,
            check: this.check,
            ...changes
        })
    }
}

export function findIDOfE(e, harmonogram)
{
    const elementPos = harmonogram.map((x) => { return x.ID; });
    return elementPos.indexOf(e)
}