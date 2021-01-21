import React, { useEffect } from 'react';

import CanvasGame from './utils';

export default function Game() {

    let game: CanvasGame

    useEffect(() => {
        const canvas = document.querySelector('canvas')
        game = new CanvasGame(canvas!)
        game.start();
    }, []);

    function mouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        event.persist();
    
        const target: HTMLCanvasElement = event.target as HTMLCanvasElement
        const boundingClientRect = target.getBoundingClientRect();
    
        game!.mouseMove(event.clientX - boundingClientRect.x, event.clientY - boundingClientRect.y)
    }

    function click(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        event.persist();
    
        const target: HTMLCanvasElement = event.target as HTMLCanvasElement
        const boundingClientRect = target.getBoundingClientRect();
    
        game!.hintBlock(event.clientX - boundingClientRect.x, event.clientY - boundingClientRect.y)
    }

    return (
        <div>
            <canvas 
                width="600" 
                height="600" 
                onMouseMove={mouseMove}
                onClick={click}
            />
        </div>
    )
}