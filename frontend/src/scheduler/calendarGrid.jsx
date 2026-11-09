
import DayColumn from './dayColumn.jsx'

const CalendarGrid = ({parsedEntries, start, numHours}) => {

    const days = ["Poniedzialek", "Wtorek", "Środa", "Czwartek", "Piatek", "Sobota", "Niedziela"];
    const hours = Array(numHours * 4).fill().map((x, i) => 100 * Math.floor((i * 15) / 60) + start + (i * 15) % 60)
    const rows = `${hours.map(hour => `[g${hour}] 0.6rem`).join(" ")}`

    return <div className={`w-[80%] pr-4 pt-2 pb-5 m-auto bg-white flex rounded-xl`} >
            <div className="m-auto ml-2">
                <div className="m-auto text-black text-center">
                    Czas
                </div>
                <div className="grid" style={{ gridTemplateRows: rows }}>
                    {
                        hours.filter((h) => h%100==0).map((h) => {
                            return <div key={h} className="m-auto text-[0.6rem] text-black text-right" style={{ gridRow: `g${h}` }}>{`${Math.floor(h / 100)}:${(h % 100).toString().padStart(2, 0)}`}</div>
                            }
                        )
                    }
                </div>

            </div>
            {days.map((day, index) =>
                <DayColumn day={day} hours={hours} entries={parsedEntries[index]} rows={rows} index={index} start={start} ></DayColumn>
            )}
        </div>
}

export default CalendarGrid