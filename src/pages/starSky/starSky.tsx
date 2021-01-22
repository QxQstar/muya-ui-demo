import React, { useEffect } from 'react';

import StarSky from './utils'

let sky: StarSky

export default function Sky() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!

        sky = new StarSky(canvas);
    }, []);

    function mouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        event.persist();
    
        const target: HTMLCanvasElement = event.target as HTMLCanvasElement
        const boundingClientRect = target.getBoundingClientRect();
    
        sky!.move(event.clientX - boundingClientRect.x, event.clientY - boundingClientRect.y)
    }

    return (
        <div>
            <canvas width="800" height="600" onMouseMove={mouseMove}></canvas>
        </div>
    )
}