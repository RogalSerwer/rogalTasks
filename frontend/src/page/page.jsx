import { useState, useEffect } from 'react'
import { useWindow } from './page_window.js'
import ZadaniaLista from "../zadania/zadania.jsx"
import ZadForm from "../zadania/noweZadania.jsx"
import Harmonogram from "../harmonogram/harmonogram.jsx"
import UserConfig from "../user/user.jsx"
import { useFetchedData } from './page_data.js'
import PageButton from './pageButton.jsx'
import Scheduler from '../scheduler/scheduler.jsx'
import { AppContext } from '../utils/AppContext.jsx'
import { useContext } from 'react'

function Page() {

    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal, trybMain, changeView} = useWindow()
    const { update, zadania, userData, harmonogram, specificDate } = useFetchedData()
    const logout = useContext(AppContext).logout;
    
    useEffect(() => {
        update();
        const interval = setInterval(() => {
            update();
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return <>

        <div id='buttonsLayout' className='flex justify-center items-center'>
            {trybMain==0 && <PageButton clickFunc={() => {changeView(1)}} icon={"icon-calendar-plus-o"} optional={true}></PageButton> }
            {trybMain==1 && <PageButton clickFunc={() => {changeView(0)}} icon={"icon-plus"}></PageButton> }
            <PageButton clickFunc={() => {otworzOkno(3)}} icon={"icon-address-book-o"} optional={true}></PageButton>
            <PageButton clickFunc={() => {logout()}} icon={"icon-logout"}></PageButton>
        </div>

        <div className="modal-hidden">
            <div className="modal-content">
                <span className="close" onClick={zamknijOkno}>&times;</span>
                {trybGlobal == 0 && <ZadForm zadania={zadania} zamknijOkno={() => { zamknijOkno(0) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 1 && <Harmonogram harmonogram={harmonogram} zamknijOkno={() => { zamknijOkno(1) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 3 && <UserConfig dane={userData} zamknijOkno={() => { zamknijOkno(3) }} blad={bladOkna} callback={update} />}
            </div>

        </div>
        {trybMain == 0 && <>
            <PageButton clickFunc={() => {otworzOkno(0)}} icon={"icon-plus"}></PageButton>
            <ZadaniaLista zadania={zadania} callback={update} /></>}
        {trybMain == 1 && <>
            <PageButton clickFunc={() => {otworzOkno(1)}} icon={"icon-calendar-plus-o"} optional={true}></PageButton>
            <Scheduler zadania={zadania} harmonogram={harmonogram}></Scheduler></>}
        
    </>
}

export default Page