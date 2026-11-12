import { createContext, useContext } from "react";
import { useWindow } from "./page_window";

const WindowContext = createContext(null);

export function WindowProvider({children}) {
    const window = useWindow();

    return (<WindowContext.Provider value={window}>{children}</WindowContext.Provider>);
}

export function useWindowContext() {
    const context = useContext(WindowContext);
    return context;
}