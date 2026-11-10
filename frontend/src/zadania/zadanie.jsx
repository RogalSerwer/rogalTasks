import { useState, useEffect } from 'react'
import { useRequestActions } from './zadania_service';
import { getAutoHeight, useCSSAnimation } from './zadania_css';
import { getDateFormatted, getLocalDate, getLocalTimeToShow } from './zadania_time';
import TaskButton from './buttons/taskButton';
import PriorityBar from './taskElements/priority';

const Zadanie = ({ zadanie, d, child, callback }) => {

    const [wysuniete, setWysuniete] = useState(false);
    // Na pozniej - hook dla editow
    const [editMode, setEditMode] = useState(false);
    const [nazwa, setNazwa] = useState(zadanie['nazwa'])
    const [data, setData] = useState(zadanie['data']);
    const [starLevel, setStarLevel] = useState(zadanie['waga']);

    const { checkChildrenHeight, applyCSS, updateDiv } = useCSSAnimation(wysuniete, child, zadanie["ID"])
    const { removeTask, completeTask, updateTaskInfo } = useRequestActions(zadanie["ID"], callback, applyCSS)
    const wysunZadania = () => {
        let parent = document.querySelector(`div[data-id='child${zadanie["ID"]}']`);
        checkChildrenHeight(parent, false)
        setWysuniete(!wysuniete);
    }
    const toggleEditMode = () => {
        if (editMode) updateTaskInfo(nazwa, data, starLevel);
        setEditMode(!editMode)
    }

    window.addEventListener('resize', updateDiv);
    const czas = getDateFormatted(data, child)
    let parent = false;
    if (!child) {
        var children = JSON.parse(zadanie.children);
        children.sort(function (a, b) { return new Date(a["data"]) - new Date(b["data"])})
        parent = JSON.parse(zadanie["children"])[0].ID != null;
    }
    const dateFormat = getLocalDate(data)
    let date = getLocalTimeToShow(data, child)    
    
    useEffect(() => {
        updateDiv();
    }, [zadanie])
    return (
        <div className='mainTaskContainer'>
            <div keyprop={zadanie["ID"]} className={(child) ? 'taskRowChild' : 'taskRow'} style={(czas.getTime() - d.getTime() <= 0) ? { backgroundColor: "rgb(123, 122, 117)" } : ((d.getYear() == czas.getYear() && d.getMonth() == czas.getMonth() && d.getDate() == czas.getDate()) ? { backgroundColor: "#9f1818" } : {})} data-id={zadanie["ID"]}>
                <PriorityBar editMode={editMode} starLevel={starLevel} setStarLevel={setStarLevel}></PriorityBar>
                <div className='taskContentWrapper'>
                    {(editMode) ? (<div className='text-[calc(1.0vw+2vh)] ml-[1.5vw] font-bold'><input onChange={(e) => { setNazwa(e.target.value) }} size={nazwa.length} className='nameChangeInput' type='text' value={nazwa}></input></div>) : (<div className='text-[calc(1.0vw+2vh)] ml-[1.5vw] font-bold'>{nazwa}</div>)}
                    <div className='ml-[1.5vw] text-[calc(0.4vw+1.4vh)]'>
                        {editMode ? <input type='datetime-local' onChange={(e) => {
                            const date = new Date(e.target.value);
                            setData(date.toUTCString());
                        }} value={dateFormat}></input> : date}
                    </div>
                    {(!child && parent) && (<div style={{ height: "3px", backgroundColor: "#73603c", width: "90%", margin: "auto", marginTop: "2vh", marginBottom: "1vh" }}><div className='progress' style={{ height: "100%", position: "relative", top: "0", left: "0", backgroundColor: "#ddddb6", width: (zadanie["ratio"] + "%") }}></div></div>)}
                </div>
                <div className='buttons'>
                    {(!child && parent) && <TaskButton type='unwrap' fun={()=>{wysunZadania(zadanie["ID"])}} icon='icon-down-open' style={((wysuniete) ? { transform: "rotate(0deg)" } : { transform: "rotate(90deg)" })} ></TaskButton>}
                    {((child || !parent) && !editMode) && <TaskButton type="finished" fun={()=>{completeTask()}} icon='icon-ok' ></TaskButton>}
                    {(editMode && (child || !parent)) && <TaskButton type="removed" fun={()=>{removeTask()}} icon='icon-trash-empty'></TaskButton>}
                    <TaskButton type='edit' fun={() => {toggleEditMode()}} icon='icon-edit'></TaskButton>
                </div>
            </div>
            <div key={"child" + zadanie["ID"]} className="h-[0px] mb-[1vw] overflow-hidden transition-all" data-id={"child" + zadanie["ID"]}>
                {
                    (!child) &&
                    children.map((zadChild) => {
                        if (zadChild['nazwa'] != null)
                            return <Zadanie key={zadChild["ID"]} zadanie={zadChild} d={d} child={true} callback={callback}></Zadanie>
                        else
                            return null
                    })
                }
            </div>
        </div>
    )

}
export default Zadanie