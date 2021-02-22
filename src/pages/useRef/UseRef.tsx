import React, { useRef, forwardRef, useEffect, useImperativeHandle } from 'react';

function MyFuncButton(props: any, ref: any) {
    return <input ref={ref}/>
}
const MyFuncButtonF = forwardRef(MyFuncButton)

function MyIntprName(props: any, ref: any) {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref,() => ({
        focus: () => {
            inputRef.current!.focus();
        }
    }))

    return (
        <>
        <p>Name</p>
        <input ref={inputRef}/>
        </>
    )
}

const MyIntprNameF = forwardRef(MyIntprName)

export default function LearnRef() {
    const inputRef = useRef<HTMLInputElement>(null)
    const funcRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current!.focus()
    }, []);
    return <>
        <input ref={inputRef}/>
        <button onClick={() => funcRef.current!.focus()}> fouce ButtonF</button>
        <MyFuncButtonF ref={funcRef}/>
        <button onClick={() => nameRef.current!.focus()}> fouce name</button>
        <MyIntprNameF ref={nameRef}/>
    </>
}