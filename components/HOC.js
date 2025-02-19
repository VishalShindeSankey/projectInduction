import { useState } from "react";

const HighOrderFunction = (OriginalComponent)=>{
    const newComponent = ()=>{
        const [count,setCount] = useState(0);
        const increaseCount = ()=>{
            setCount(count+1);
        }

        return <OriginalComponent count={count} increaseCount={increaseCount}/>
    }
    return newComponent;
}

export default HighOrderFunction;