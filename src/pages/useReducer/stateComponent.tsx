import React, { useReducer } from 'react';

interface ICountState {
    count: number;
}
interface ITimeState {
    time: number;
}

interface IContext {
    countState: ICountState,
    countDispatch: React.Dispatch<IAction>,
    timeState: ITimeState,
    timeDispatch: React.Dispatch<IAction>,
}

interface IPropsOfStateComponent {
    children: React.ReactNode
}

interface IAction {
    type: string,
    params?: any
}

const initState: ICountState = {count: 0}
const initTime: ITimeState = {time: 0}

export const globalContext = React.createContext<IContext>({
    countState: initState,
    countDispatch: function dispatch(action: IAction) {},
    timeState: initTime,
    timeDispatch: function dispatch(action: IAction) {},
})

export default function StateComponent ({ children }: IPropsOfStateComponent) {
    const [countState, countDispatch] = useReducer(function reducer(state: ICountState, action: IAction): ICountState {
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
    }, initState)

    const [timeState, timeDispatch] = useReducer(function reducer(state: ITimeState, action: IAction): ITimeState {
        switch(action.type) {
            case 'add':
                return {time: state.time + 1}
            case 'sub':
                return {time: state.time - 1}
            case 'reset':
                return {time: initTime.time}
            default:
                throw new Error();
        }
    }, initTime)

    return <globalContext.Provider value={{countState, countDispatch, timeState, timeDispatch}}>
        {children}
    </globalContext.Provider>
}