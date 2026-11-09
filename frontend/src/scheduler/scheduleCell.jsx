const ScheduleCell = ({hourRowStart, hourRowEnd, name}) => {
    // Potem mozna dodac takie sprawy jak kolory itd.
    return <div className="h-[98%] rounded-xl w-[98%] border border-red-400/50 m-auto text-xs text-black bg-red-300/70 flex item-center justify-center" style={{ gridRow: `${hourRowStart} / ${hourRowEnd}` }}>
        <div className="h-fit m-auto">{name}</div>
    </div>
    
}

export default ScheduleCell;