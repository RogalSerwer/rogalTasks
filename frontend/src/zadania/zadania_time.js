export function getDateFormatted(data, child) {
    if (data != null) {
        return new Date(data);
    }
    else
        return new Date(8.64e15)
}

export function getLocalDate(data)
{
    if (data!=null)
    {
        const localDate = new Date(data);
        return `${localDate.getFullYear()}-${`${localDate.getMonth() + 1}`.padStart(2, 0)}-${`${localDate.getDate()}`.padStart(2, 0)}T${`${localDate.getHours()}`.padStart(2, 0)}:${`${localDate.getMinutes()}`.padStart(2, 0)}`
    }
    else return "";

}

export function getLocalTimeToShow(data, child) {
    let date = data
    if (data!=null)
    {
        date = new Date(data).toString();
        let id = date.indexOf('(')
        if (id!=-1) date = date.slice(0,id)
    }

    return date;
}