const currentTime = new Date();
currentTime.setDate(currentTime.getDate() + 1);
var dataTemp = `${currentTime.getFullYear()}-${`${currentTime.getMonth() + 1}`.padStart(2, 0)}-${`${currentTime.getDate()}`.padStart(2, 0)}`;

export function dayStateReducer(state, action) {
    switch (action.type) {
        case "FULL_CHANGE":
            return {
                data: action.payload.data,
                dayTime: action.payload.dayTime,
                intervalMode: action.payload.intervalMode,
                intervalVal: action.payload.intervalVal,
            }
        case "INTERVALS":
            return {
                ...state,
                intervalMode: action.payload.intervalMode,
                intervalVal: action.payload.intervalVal,
            }
        case "INTERVAL_MODE":
            return {
                ...state,
                intervalMode: action.payload,
            }
        case "INTERVAL_VAL":
            return {
                ...state,
                intervalVal: action.payload,
            }
        case "DAYTIME":
            return {
                ...state,
                dayTime: action.payload
                
            }
        case "DATE":
            return {
                ...state,
                data: action.payload
            }
        case "RESET":
            return initialDayState
        default:
            return { ...state }
    }
}

export const initialDayState = {
    data: dataTemp,
    dayTime: "12:00",
    intervalMode: 0,
    intervalVal: 1
}