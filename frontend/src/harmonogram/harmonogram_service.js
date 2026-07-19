import { parseDniDay, parseDniWeek } from "./harmonogram_mapper.js"

export async function removeHarmonogram(backendLink, ID) {
    const url = `${backendLink}harmoRemove/${ID}`;
    const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
    }
    const response = await fetch(url, options);
    return response;
}

export async function createHarmonogram(backendLink, userID, dane) {
    const url = `${backendLink}harmonogramCreate/${userID}`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dane)
    }
    const response = await fetch(url, options);
    return response.status

}

export async function editHarmonogram(backendLink, currentHID, dane) {
    const url = `${backendLink}harmonogramEdit/${currentHID}`
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dane)
    }
    const response = await fetch(url, options);
    return response.status
}

export function prepareDataToSubmit(dayState, dniTygodnia, infoState) {
    var dniD;
    if (dayState.intervalMode == 0)
        dniD = parseDniDay(dayState.intervalVal, dayState.dayTime, dayState.data)
    else
        dniD = parseDniWeek(dniTygodnia, dayState.intervalVal)

    return {nazwa: infoState.nazwa, dniD}
}