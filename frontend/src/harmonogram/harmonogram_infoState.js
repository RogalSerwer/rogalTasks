export function infoStateReducer(state, action) {
    switch (action.type) {
        case "HARMO_CHANGE":
            return {
                nazwa: action.payload.nazwa,
                currentH: action.payload.H,
                currentHID: action.payload.HID
            }
        case "NAME_CHANGE":
            return {
                ...state,
                nazwa: action.payload
            }
        default:
            return { ...state }
    }
}

export const initialInfoState = {
    nazwa: "", currentH: "new", currentHID: "new"
}