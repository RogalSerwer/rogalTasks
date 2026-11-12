import { HarmoParserFactory} from "./harmoParse";
import { TasksParserFactory } from "./tasksParse";


export function onEntriesParse(harmonogram, zadania, currentWeek, currentWeekEnd, start, numHours)
{
    const harmoParser = HarmoParserFactory(currentWeek, currentWeekEnd, start, numHours);

    const parserTypes = {
        "task": TasksParserFactory(start, numHours),
        "harmo-daily": harmoParser.daily,
        "harmo-weekly": harmoParser.weekly,
    }

    function parse(entry) {
        const parser = parserTypes[entry.type];
        if (parser!=null)
            return parser(entry)
    }

    function parseDayTables(entries) {
        const days = [[],[],[],[],[],[],[]];
        entries.forEach(entry => {
            if (entry!=null)
                for (let i = 0; i <7; i++)
                    days[i].push(...entry[i]);
        });
        return days;
    }

    function prepareEntries(harmonogram, zadania, currentWeek, currentWeekEnd)
    {
        const entries = [
            ...harmonogram.map(h => ({
                ...h,
                type: "harmo-" + h.dni.type
            })),
            ...zadania.filter(t => t["data"]!=null).map(t => ({
                ...t,
                data: new Date(t["data"]),
                type: "task"
            })).filter(t => t.data >= currentWeek && t.data <= currentWeekEnd),
        ]
        const weeks = parseDayTables(entries.map(parse));
        return weeks;
    }


    const parsedEntries = prepareEntries(harmonogram, zadania, currentWeek, currentWeekEnd);
    return {parsedEntries}
    
}