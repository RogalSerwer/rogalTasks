import Zadanie from "./zadanie";
import PageButton from "../utils/pageButton";
import { useWindowContext } from "../utils/window/WindowContext";

const ZadaniaLista = ({zadania, callback}) => {

    const d = new Date();
    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal, trybMain, changeView} = useWindowContext()
    const zadBezRodzica = zadania.filter((zad) => zad["parentID"] == 0);

    return <>
        <div className="flex justify-center items-center mx-auto">
            <PageButton clickFunc={() => { otworzOkno(0) }} icon={"icon-plus"}></PageButton>
        </div>
        <div className="w-[calc(64vw+6rem)] mx-auto">
            <div className="mt-[1vw] mb-[5vw] rounded-4xl border-dashed border-[0.2vw] bg-[var(--backdrop)] border-[var(--color-accent)]">
                {
                    zadBezRodzica.map((zadanie) => {
                        return <Zadanie key={zadanie["ID"]} zadanie={zadanie} d={d} child={false} callback={callback}></Zadanie>
                    }
                    )}
            </div>
        </div></>
}

export default ZadaniaLista