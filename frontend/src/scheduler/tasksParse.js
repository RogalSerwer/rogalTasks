import { getHours } from "./parseUtils";

function TasksParser(entry, start, numHours) {
    const daysElements = [[], [], [], [], [], [], []];
    const [hourRowStartVal, hourRowStart, hourRowEndVal, hourRowEnd] = getHours(entry["data"].getHours(), entry["data"].getMinutes(), entry["waga"]);
    const day = `${(entry["data"].getDay() + 6) % 7}`
    if (hourRowStartVal >= start && hourRowEndVal <= start + numHours * 100 + 100)
    {
        daysElements[day].push({ name: entry.nazwa, hourRowStart, hourRowEnd })
        return daysElements;
    }

}
export function TasksParserFactory(start, numHours) {
    function TasksAdapter(entry) {
        return TasksParser(entry, start, numHours);
    }
    return TasksAdapter;
}
