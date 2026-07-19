
const Scheduler = ({harmonogram}) => {
    return <div>{harmonogram.map((h) => (
        <div>{h["nazwa"]}</div>
    ))}</div>
}

export default Scheduler