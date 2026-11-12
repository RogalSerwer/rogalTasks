import { useState } from 'react'
import { useWindowContext } from '../utils/window/WindowContext.jsx'
import HeaderText from "../utils/headerText"
import { onEntriesParse } from './parser.js'
import { onCalendarProcess } from './calendarDates.js'
import CalendarGrid from './calendarGrid.jsx'
import CalendarDateSelect from './calendarDateSelect.jsx'


const Scheduler = ({ harmonogram, zadania }) => {

    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal, trybMain, changeView} = useWindowContext()

    const calendarInfo = onCalendarProcess();
    const parsed = onEntriesParse(harmonogram, zadania, calendarInfo.currentWeek, calendarInfo.currentWeekEnd, calendarInfo.start, calendarInfo.numHours);

    return <div className='w-[80vw] mb-[10rem]'>
        <CalendarDateSelect otworzOkno={otworzOkno} calendarInfo={calendarInfo}></CalendarDateSelect>
        <CalendarGrid parsedEntries={parsed.parsedEntries} start={calendarInfo.start} numHours={calendarInfo.numHours}></CalendarGrid>
    </div>
}

export default Scheduler
