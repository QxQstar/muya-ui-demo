import React, { useState, useEffect } from 'react';

export default function LearnEffect() {

    const [count, setCount] = useState<number>(0)
    const [name, setName] = useState<string>('')
    useEffect(() => {
        if (count > 3) {
            console.log('超过三次')
        }
    }, [count]);
    
    const changeName = () => {
        setName(name + 'e')
    }
    return (
        <div>
            {count} 
            <button onClick={() => setCount(count + 1)}> click</button>
            <input value={name} onInput={changeName}/>
        </div>
    )
}