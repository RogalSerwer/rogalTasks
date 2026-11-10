import { useAppContext } from '../utils/consts/AppContext.jsx'

export async function sendRequest(id, backendLink, callback, method, endpoint, body = null)
{
    const url = `${backendLink}${endpoint}/${id}`;
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
    }
    if (body!= null) options.body = body
    const response = await fetch(url, options)
    if (callback!=null)
        setTimeout(async () => {
            callback();
        }, 1000)
    return response;
}


// To nie jest do konca hook, ale może w przyszlosci cos sie doda
export function useRequestActions(id, callback, applyCSS) {
    const backendLink = useAppContext().backendLink;
    const removeTask = async () => {
        applyCSS();
        sendRequest(id, backendLink, callback, "DELETE", "usunZadanie")
    }
    const completeTask = async () => {
        applyCSS();
        sendRequest(id, backendLink, callback, "PATCH", "wykonajZadanie")
    }
    const updateTaskInfo = async (nazwa, data, star) => {

        let date = null;
        if (data!="" && data!=null)
            date = new Date(data).toISOString()
        const dane = {
            nazwa, data: date, waga: star
        }
        sendRequest(id, backendLink, null, "PATCH", "updateTaskInfo", JSON.stringify(dane))
    }
    return {removeTask, completeTask, updateTaskInfo}

}