import { useState, useEffect } from 'react'
import { useWindowContext } from '../utils/window/WindowContext.jsx'
import ZadaniaLista from "../zadania/zadania.jsx"
import ZadForm from "../zadania/noweZadania.jsx"
import Harmonogram from "../harmonogram/harmonogram.jsx"
import UserConfig from "../user/user.jsx"
import { useFetchedData } from './page_data.js'
import PageButton from '../utils/pageButton.jsx'
import Scheduler from '../scheduler/scheduler.jsx'
import ButtonsLayout from './buttonLayout.jsx'

function Page() {

    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal, trybMain, changeView} = useWindowContext()
    const { update, zadania, userData, harmonogram, specificDate } = useFetchedData()
    
    useEffect(() => {
        update();
        const interval = setInterval(() => {
            update();
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return <>

        <div className="modal-hidden">
            <div className="modal-content">
                <span className="close" onClick={zamknijOkno}>&times;</span>
                {trybGlobal == 0 && <ZadForm zadania={zadania} zamknijOkno={() => { zamknijOkno(0) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 1 && <Harmonogram harmonogram={harmonogram} zamknijOkno={() => { zamknijOkno(1) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 3 && <UserConfig dane={userData} zamknijOkno={() => { zamknijOkno(3) }} blad={bladOkna} callback={update} />}
            </div>

        </div>
        {trybMain == 0 && <>
            <ZadaniaLista zadania={zadania} callback={update} /></>}
        {trybMain == 1 && <>
            <Scheduler zadania={zadania} harmonogram={harmonogram}></Scheduler></>}

        <ButtonsLayout></ButtonsLayout>


    </>
}

export default Page