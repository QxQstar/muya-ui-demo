import React, {useContext } from 'react';

import StateComponent, { globalContext } from './stateComponent'

function LearnReducer() {
    const {countState, countDispatch, timeState} = useContext(globalContext)

    return <div>
        <div>count: {countState.count}, time: { timeState.time} </div>
        <button onClick={() => countDispatch({type: 'add'})}>add</button>
        <button onClick={() => countDispatch({type: 'sub'})}>sub</button>
        <button onClick={() => countDispatch({type: 'reset'})}>reset</button>
    </div>
}

function ShowCount() {
    const {timeDispatch} = useContext(globalContext)
    return <div> 
            <button onClick={() => timeDispatch({type: 'add'})}>add</button>
            <button onClick={() => timeDispatch({type: 'sub'})}>sub</button>
            <button onClick={() => timeDispatch({type: 'reset'})}>reset</button>
        </div>
}

export default function () {
    return <StateComponent>
        <LearnReducer/>
        <ShowCount/>
    </StateComponent>
}