import { useState } from 'react'
import HeaderText from "../utils/headerText"

const Scheduler = ({ harmonogram, zadania }) => {
    const now = new Date();
    const numHours = 18;
    const start = 600;

    now.setHours(0, 0, 0, 0);
    const startOfThisWeek = new Date(now - ((now.getDay() + 6) % 7) * 1000 * 60 * 60 * 24);
    const endOfThisWeek = new Date(now - ((now.getDay() + 6) % 7 - 6) * 1000 * 60 * 60 * 24);
    const [currentWeek, setCurrentWeek] = useState(startOfThisWeek)
    const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfThisWeek)
    const days = ["Poniedzialek", "Wtorek", "Środa", "Czwartek", "Piatek", "Sobota", "Niedziela"];
    const hours = Array(numHours * 4).fill().map((x, i) => 100 * Math.floor((i * 15) / 60) + start + (i * 15) % 60)
    const rows = `${hours.map(hour => `[g${hour}] 0.6rem`).join(" ")}`
    const zads = zadania.filter(it => it["data"] != null).map(it => ({ "nazwa": it["nazwa"], "data": new Date(it["data"]) })).filter(it => it["data"] >= currentWeek && it["data"] <= currentWeekEnd);
    const tasksForDays = [[], [], [], [], [], [], []];
    const weekForward = () => {
        const newWeek = new Date(currentWeek.getTime() + 7*24*60*60*1000);
        const newEndWeek = new Date(currentWeek.getTime() + 13*24*60*60*1000);
        setCurrentWeek(newWeek);
        setCurrentWeekEnd(newEndWeek);
    }
    const weekBackward = () => {
        const newWeek = new Date(currentWeek.getTime() - 7*24*60*60*1000);
        const newEndWeek = new Date(currentWeek.getTime() - 24*60*60*1000);
        setCurrentWeek(newWeek);
        setCurrentWeekEnd(newEndWeek);
    }
    harmonogram.forEach((entry) => {
        if (entry.dni.type == "weekly") {
            entry.dni.days.forEach((day) => {
                const hourRowStartVal = day.hour * 100 + day.minute;
                const hourRowStart = `g${hourRowStartVal}`
                const hourRowEndVal = day.hour * 100 + 100 + day.minute;
                const hourRowEnd = `g${hourRowEndVal}`
                if (hourRowStartVal>=start && hourRowEndVal<=start+numHours*100+100)
                    tasksForDays[day.id].push({ name: entry.nazwa, hourRowStart, hourRowEnd });
            })
        }
        else if (entry.dni.type == "daily") {
            // Caly bullshit z UTC, nie wiem jak to naprawic zeby wszystko bylo poprawnie
            const s = new Date(entry.lastAdded)
            const year = s.getUTCFullYear();
            const month = s.getUTCMonth();
            const day = s.getUTCDate();
            const [hour, minute] = entry.dni.time.split(":").map(Number)
            const hourRowStartVal = hour * 100 + minute;
            const hourRowEndVal = hour * 100 + 100 + minute;
            if (hourRowStartVal>=start && hourRowEndVal<=start+numHours*100+100)
            {
                const start = new Date(year, month, day);
                console.log(start);
                let startThisWeek;
                console.log(entry.dni.date)
                console.log(entry.lastAdded)
                const interval = parseInt(entry.dni.interval);
                if (start < currentWeek) {
                    const diff = ((currentWeek - start) / (24 * 60 * 60 * 1000)) % interval;
                    console.log(diff);
                    if (diff!=0)
                        startThisWeek = ((interval - diff));
                    else
                        startThisWeek = diff;
                }
                else if (start <= currentWeekEnd) startThisWeek = (start.getDay() + 6) % 7;
                else return;
                console.log(startThisWeek)
                if (startThisWeek>=7) return;
                let days = [startThisWeek];
                while (days[days.length - 1] + interval < 7) days.push(days[days.length - 1] + interval);
                const hourRowStart = `g${hourRowStartVal}`
                const hourRowEnd = `g${hourRowEndVal}`
                days.forEach((day) => {
                    tasksForDays[day].push({ name: entry.nazwa, hourRowStart, hourRowEnd })
                })
            }
        }
    })
    zads.forEach((entry) => {
        const hourRowStartVal = entry["data"].getHours() * 100 + entry["data"].getMinutes()
        const hourRowEndVal = entry["data"].getHours() * 100 + entry["data"].getMinutes() + 100
        const hourRowStart = `g${hourRowStartVal}`
        const hourRowEnd = `g${hourRowEndVal}`
        const day = `${(entry["data"].getDay() + 6) % 7}`
        if (hourRowStartVal>=start && hourRowEndVal<=start+numHours*100+100)
            tasksForDays[day].push({ name: entry.nazwa, hourRowStart, hourRowEnd })
    })

    return <div className='w-[80vw]'>
        <div className='flex w-fit m-auto mb-[1.7rem] items-center'>
            <button className='mr-[1.5rem]' onClick={() => weekBackward()}>a</button>
            <div className='text-[1.4vw] mb- font-bold m-auto w-fit'>{`${currentWeek.getDate()}-${currentWeek.getMonth() + 1}-${currentWeek.getYear() + 1900}`} / {`${currentWeekEnd.getDate()}-${currentWeekEnd.getMonth() + 1}-${currentWeekEnd.getYear() + 1900}`}</div>
            <button className='ml-[1.5rem]' onClick={() => weekForward()}>b</button>
        </div>
        <div className={`w-[80%] pr-4 pt-2 pb-5 m-auto bg-white flex rounded-xl`} >
            <div className="m-auto ml-2">
                <div className="m-auto text-black text-center">
                    Czas
                </div>
                <div className="grid" style={{ gridTemplateRows: rows }}>
                    {
                        hours.filter((h) => h%100==0).map((h) => {
                            return <><div className="m-auto text-[0.6rem] text-black text-right" style={{ gridRow: `g${h}` }}>{`${Math.floor(h / 100)}:${(h % 100).toString().padStart(2, 0)}`}</div>
                            </>
                            }
                        )
                    }
                </div>

            </div>
            {days.map((day, index) =>
                <div className="m-auto w-[100%]">
                    <div className="m-auto text-black text-center">
                        {day}
                    </div>
                    <div className="relative border border-dashed border-l-gray-400">
                        <div className="grid absolute inset-0 z-0" style={{ gridTemplateRows: rows }}>
                            {hours.map((h) => {
                                const color = ((h - 45) % 100) ? (h == start) ? "border-t-gray-400 border-b-gray-300" : "border-b-gray-300" : "border-b-gray-400"
                                return <>
                                    <div style={{ gridRow: `g${h}`, }} class={`border border-dashed ${color}`}></div>
                                </>
                            }
                            )}
                        </div>
                        <div className="relative grid z-10" style={{ gridTemplateRows: rows }}>
                            {tasksForDays[index].map(entry => {
                                return <div className="h-[98%] rounded-xl w-[98%] border border-red-400/50 m-auto text-xs text-black bg-red-300/70 flex item-center justify-center" style={{ gridRow: `${entry.hourRowStart} / ${entry.hourRowEnd}` }}><div className="h-fit m-auto">{entry.name}</div></div>
                            }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>

    </div>
}

export default Scheduler
