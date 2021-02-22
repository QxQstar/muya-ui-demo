import React, { useReducer } from 'react';

interface IState {
    count: number
}

interface IAction {
    type: string,
    params?: any
}

const initState: IState = {count: 0}

function reducer(state: IState, action: IAction): IState {
    switch(action.type) {
        case 'add':
            return {count: state.count + 1}
        case 'sub':
            return {count: state.count - 1}
        case 'reset':
            return {count: initState.count}
        default:
            throw new Error();
    }
}

export default function LearnReducer() {
    const [state, dispatch] = useReducer(reducer, initState)

    return <div>
        <div>count: {state.count}</div>
        <button onClick={() => dispatch({type: 'add'})}>add</button>
        <button onClick={() => dispatch({type: 'sub'})}>sub</button>
        <button onClick={() => dispatch({type: 'reset'})}>reset</button>
    </div>
}