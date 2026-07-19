const HarmonogramDay = ({ form }) => {
    return <>
        <h2>Godzina</h2>
        <input type='time' id='timeDay' value={form.dayState.dayTime} onChange={(e) => form.dispatchDay({ type: "DAYTIME", payload: e.target.value })}></input>
        <h2>Start</h2>
        <input type="date" id="dayData" value={form.dayState.data} onChange={(e) => form.dispatchDay({ type: "DATE", payload: String(e.target.value) })} />
    </>
}
export default HarmonogramDay