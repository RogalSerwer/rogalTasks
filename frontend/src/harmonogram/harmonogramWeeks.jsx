import { Dzien } from "./harmonogram_helpers.js"

const HarmonogramWeek = ({form }) => {
    return <div className="overflow-auto max-h-[20vh]">
        <h2>Dni tygodnia</h2>
        {form.dniTygodnia.map((Dzien) => (
            <>
                <div className="w-fit m-6 flex mx-auto items-center" key={Dzien.id}>
                    <label className="flex items-center gap-5 cursor-pointer" >{Dzien.nazwa}
                        <input type='checkbox' checked={Dzien.check} onChange={(e) => { form.updateDni(Dzien.id, { check: !Dzien.check }) }}></input></label>
                </div>
                {Dzien.check && <input type='time' value={Dzien.hour} onChange={(e) => form.updateDni(Dzien.id, { hour: e.target.value })}></input>}
            </>
        ))}
    </div>
}

export default HarmonogramWeek