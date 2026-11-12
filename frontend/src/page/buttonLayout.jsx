import { useAppContext } from "../utils/consts/AppContext"
import { useWindowContext } from '../utils/window/WindowContext.jsx'
import PageButton from '../utils/pageButton.jsx'

function ButtonsLayout() {
    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal, trybMain, changeView} = useWindowContext()
    const logout = useAppContext().logout;

    return <>
        <div className="flex justify-center">
            <div className='rounded-4xl bg-[var(--backdrop2)] z-100 fixed bottom-0 w-[50%] mx-auto mb-[1rem]' >
                <div id='buttonsLayout' className='flex justify-center items-center'>
                    {trybMain==0 && <PageButton clickFunc={() => {changeView(1)}} icon={"icon-calendar-plus-o"} optional={true}></PageButton> }
                    {trybMain==1 && <PageButton clickFunc={() => {changeView(0)}} icon={"icon-plus"}></PageButton> }
                    <PageButton clickFunc={() => {otworzOkno(3)}} icon={"icon-address-book-o"} optional={true}></PageButton>
                    <PageButton clickFunc={() => {logout()}} icon={"icon-logout"}></PageButton>
                </div>
            </div>
        </div>
    </>
}
export default ButtonsLayout