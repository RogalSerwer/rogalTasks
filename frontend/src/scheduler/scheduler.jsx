import { useState } from 'react'
import HeaderText from "../utils/headerText"

const Scheduler = ({harmonogram, zadania}) => {
    const now = new Date();
    const startOfThisWeek = new Date(now - ((now.getDay()+6)%7)*1000*60*60*24);
    const endOfThisWeek = new Date(now - ((now.getDay()+6)%7-6)*1000*60*60*24);
    const [currentWeek, setCurrentWeek] = useState(startOfThisWeek)
    const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfThisWeek)
    const days = ["Poniedzialek", "Wtorek", "Środa", "Czwartek", "Piatek", "Sobota", "Niedziela"];
    const hours = Array(12*4).fill().map((x,i)=>100*Math.floor((i*15)/60)+800+(i*15)%60)
    const rows = `3rem ${hours.map(hour => `[g${hour}] 0.95rem`).join(" ")}`
    const zads = zadania.filter(it => it["data"]!=null).map(it => ({"nazwa" : it["nazwa"], "data" : new Date(it["data"])})).filter(it => it["data"] >= currentWeek && it["data"] <= currentWeekEnd);
    console.log(zads)
    console.log(zadania)
    return <div className='w-[80vw]'>
        <div className='flex w-fit m-auto mb-[1.7rem] items-center'>
            <button className='mr-[1.5rem]'>a</button>
            <div className='text-[1.4vw] mb- font-bold m-auto w-fit'>{`${currentWeek.getDate()}-${currentWeek.getMonth()+1}-${currentWeek.getYear()+1900}`} / {`${currentWeekEnd.getDate()}-${currentWeekEnd.getMonth()+1}-${currentWeekEnd.getYear()+1900}`}</div>
            <button className='ml-[1.5rem]'>b</button>
        </div>
        <div className={`w-[80%] pr-4 pt-2 pb-5 m-auto bg-white grid grid-cols-[0.5fr_repeat(7,_1fr)] rounded-xl`} style={{gridTemplateRows:rows}}>
            <div></div>
            {days.map((day)  => 
                (<div className="m-auto text-black">
                    {day}
                </div>)
            )}
            {hours.map((h) => {
                const color = ((h-45)%100) ? (h==800)? "border-t-gray-600 border-b-gray-300" : "border-b-gray-300" : "border-b-gray-600"
                return <><div className="m-auto text-xs text-black" style={{gridRow:`g${h}`}}>{`${Math.floor(h/100)}:${(h%100).toString().padStart(2,0)}`}</div>{
                    Array(7).fill().map((x,i)=><div style={{gridRow:`g${h}`, gridColumn: i+2}} class={`border ${color}`}></div>)}</>
                
                }
            )}
            {harmonogram.map((entry) => {
                if (entry.dni.type=="weekly")
                {
                    return entry.dni.days.map((day) => {
                        const hourRowStart = `g${day.hour*100+day.minute}`
                        const hourRowEnd = `g${day.hour*100+100+day.minute}`
                        const dayCol = `${day.id+2}`
                        return <div className="h-[98%] rounded-xl w-[98%] border border-red-400/50 m-auto text-xs text-black bg-red-300/70 flex item-center justify-center" style={{gridRow: `${hourRowStart} / ${hourRowEnd}`, gridColumn: dayCol}}><div className="h-fit m-auto">{entry.nazwa}</div></div>
                    })
                }
            })}
            {zads.map((entry) => {
                console.log(entry)
                const hourRowStart = `g${entry["data"].getHours()*100+entry["data"].getMinutes()}`
                const hourRowEnd = `g${entry["data"].getHours()*100+entry["data"].getMinutes()+100}`
                const dayCol = `${(entry["data"].getDay()+6)%7+2}`
                return <div className="h-[98%] rounded-xl w-[98%] border border-red-400/50 m-auto text-xs text-black bg-red-300/70 flex item-center justify-center" style={{gridRow: `${hourRowStart} / ${hourRowEnd}`, gridColumn: dayCol}}><div className="h-fit text-center m-auto">{entry.nazwa}</div></div>
            })}
        </div>
        {/* {harmonogram.map((wpis) => (<p>{wpis.nazwa}</p>))} */}
    </div>
}

export default Scheduler