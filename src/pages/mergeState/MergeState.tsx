import React, { useState } from 'react'

interface IState {
    w: number
    h: number
}

type MergeFunc = (params: {[attr: string]: number}) => void

function useMerge(initState: IState): any[] {
    const [state, setState] = useState<IState>(initState);

    const merge: MergeFunc = (param: {[attr: string]: number}) => {
        setState({
            ...state,
            ...param
        })
    }

    return [state, merge]
}

export default function MergeState() {
    const [params, setParams] = useMerge({w: 0, h: 0})

   return (
       <>
       <div>w: {params.w}</div>
       <div>h: {params.h}</div>
       <button onClick={() => setParams({w: params.w + 10})}> change w</button>
       <button onClick={() => setParams({h: params.h + 10})}> change h</button>
       </>
   )
    
}