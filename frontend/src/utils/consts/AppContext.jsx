import { createContext, useContext } from "react";
import { useConsts } from "./consts";

const AppContext = createContext(null);

export function AppContextProvider({children}) {
    const consts = useConsts();
    return (<AppContext.Provider value={consts}>{children}</AppContext.Provider>);
}

export function useAppContext() {
    const context = useContext(AppContext);
    return context;
}