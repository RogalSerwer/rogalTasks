import ScheduleCell from './scheduleCell.jsx'

const DayColumn = ({day, hours, entries, rows, index, start}) => {

    return <div className="m-auto w-[100%]">
        <div className="m-auto text-black text-center">
            {day}
        </div>
        <div className="relative border border-dashed border-l-gray-400">
            <div className="grid absolute inset-0 z-0" style={{ gridTemplateRows: rows }}>
                {hours.map((h) => {
                    const color = ((h - 45) % 100) ? (h == start) ? "border-t-gray-400 border-b-gray-300" : "border-b-gray-300" : "border-b-gray-400"
                    return <div key={h} style={{ gridRow: `g${h}`, }} className={`border border-dashed ${color}`}></div>
                }
                )}
            </div>
            <div className="relative grid z-10" style={{ gridTemplateRows: rows }}>
                {entries.map((entry, id) =>
                    <ScheduleCell key={index + "-" + id} hourRowStart={entry.hourRowStart} hourRowEnd={entry.hourRowEnd} name={entry.name}></ScheduleCell>
                )}
            </div>
        </div>
    </div>
}

export default DayColumn;