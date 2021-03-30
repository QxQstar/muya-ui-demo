import React, { useEffect, useState } from 'react';
import { Subject } from 'rxjs'

const subject = new Subject<number>();
let state = 0

const rxChat = {
    subscribe(setConut: React.Dispatch<React.SetStateAction<number>>) {
        subject.subscribe(setConut)
    },
    init() {
        state = 0
        subject.next(state)
    },
    add() {
        state += 1
        subject.next(state)
    },
    sub() {
        state -= 1
        subject.next(state)
    }
}

export default function RXJS() {
    const [count, setConut] = useState<number>(1)
    useEffect(() => {
        rxChat.subscribe(setConut)
        rxChat.init()
    }, []);
    return (
        <div>
            <div>count: {count}</div>
            <div>
                <button onClick={rxChat.add}> add </button>
                <button onClick={rxChat.sub}> sub </button>
                <button onClick={rxChat.init}> reset </button>
            </div>
        </div>
        
    )
}