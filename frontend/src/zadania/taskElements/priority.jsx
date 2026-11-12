import IconButton from "../../utils/iconButton";
import { range } from "../../utils/js/range"

const PriorityBar = ({editMode, starLevel, setStarLevel}) => {
    
    const heightVal = starLevel*20 + "%";
    return (<>{!editMode? (<div className="text-2xl" style={{"writing-mode":"vertical-rl"}} ><div className="bg-yellow-500 bg-clip-text text-transparent" style={{"height": heightVal}}>★★★★★</div></div>) : <div className="text-2xl" style={{"writing-mode":"vertical-rl"}} >
        {range(1,5).map(star => {
            return <IconButton onClick={() => {setStarLevel(star)}} className={starLevel>=star ? "text-yellow-500" :'text-mauve-600'}>★</IconButton>
        })}
    </div>}</>)
}

export default PriorityBar