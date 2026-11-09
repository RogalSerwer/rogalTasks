import PageButton from '../utils/pageButton.jsx'

const CalendarDateSelect = ({otworzOkno, calendarInfo}) => {

    return <div className='flex w-[60%] m-auto mb-[1rem] items-center'>
        <PageButton clickFunc={() => { otworzOkno(1) }} icon={"icon-calendar-plus-o"} optional={true}></PageButton>
        <div className="flex w-fit m-auto items-center">
            <button className='mr-[1.5rem]' onClick={() => calendarInfo.weekBackward()}><i className="icon-down-open inline-block rotate-90"> </i></button>
            <div className='bg-[var(--backdrop2)] flex text-[1.1vw] mb-1 px-8 font-bold m-auto w-fit py-1 rounded-2xl'>
                <div className='pr-2 border-r-2 border-dashed border-stone-700' >
                    {`${calendarInfo.currentWeek.getDate()}-${calendarInfo.currentWeek.getMonth() + 1}-${calendarInfo.currentWeek.getYear() + 1900}`}
                </div>
                <div className='ml-2'>
                    {`${calendarInfo.currentWeekEnd.getDate()}-${calendarInfo.currentWeekEnd.getMonth() + 1}-${calendarInfo.currentWeekEnd.getYear() + 1900}`}
                </div>
            </div>
            <button className='ml-[1.5rem]' onClick={() => calendarInfo.weekForward()}><i className="icon-down-open inline-block -rotate-90"></i></button>
        </div>
        <PageButton clickFunc={() => { otworzOkno(0) }} icon={"icon-plus"}></PageButton>
    </div>
}

export default CalendarDateSelect;