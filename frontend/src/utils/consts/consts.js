import { useCookies } from 'react-cookie'

export function useConsts() {
    const backendLink = import.meta.env.VITE_BACKEND;
    const [cookies, setCookie] = useCookies(['loginID']);
    const login = (ID) => {
        setCookie("loginID", ID)
    }
    const logout = () => {
        setCookie("loginID", "")
    }
    return {backendLink, userID: cookies.loginID, login, logout};
}