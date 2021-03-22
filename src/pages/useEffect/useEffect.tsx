import React, { useState, useEffect } from 'react';

export default function LearnEffect() {

    const [count, setCount] = useState<number>(0)
    const [name, setName] = useState<string>('')

    const wei = () => {
        let effectTag = 0;
        const Placement = 0b00000000010;
        const Ref = 0b00010000000;
        const Snapshot = 0b00100000000;


        effectTag = effectTag | Placement

        effectTag = effectTag | Ref

        console.log(effectTag,'将 Placement 和 Ref 添加到了 effectTag 上')

        console.log(effectTag & Ref, '是否包含 ref')

        console.log(effectTag & Snapshot, '是否包含 Snapshot')

        console.log(effectTag & Placement ,'是否包含 Placement')

        effectTag = effectTag & ~ Placement

        console.log(effectTag & Placement, '将 Placement 取反之后，是否包含 Placement')
    }
    useEffect(() => {
        if (count > 3) {
            console.log('超过三次')
        }

        wei();

    }, [count]);
    
    const changeName = () => {
        setName(name + 'e')
        setName((s) => {
            return + s + 'e'
        })
    }
    return (
        <div>
            {count} 
            <button onClick={() => setCount(count + 1)}> click</button>
            <input value={name} onChange={changeName}/>
        </div>
    )
}