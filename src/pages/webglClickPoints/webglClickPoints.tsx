import React, { useEffect } from 'react';
import DrawPoint from './utils';

let draw: DrawPoint

export default function WebglClickPoints() {
    useEffect(() => {
       const canvas = document.querySelector('canvas')!;
        draw = new DrawPoint(canvas)
    }, []);

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const target: HTMLCanvasElement = event.target as HTMLCanvasElement
        const boundingClientRect = target.getBoundingClientRect();

        const width = target.width;
        const height = target.height;

        let X = event.clientX - boundingClientRect.left
        let Y = event.clientY - boundingClientRect.top
        
        let x = (X - width/2) / (width/2)
        let y = (height/2 - Y) / (height/2)

        draw.addPoint(x,y)
    }

    const onClear = () => {
        draw.clearPoints()
    }

    return (
        <>
            <canvas width="500" height="500" onClick={onClick}/>
            <button onClick={onClear}>清空</button>
        </>
    )
}