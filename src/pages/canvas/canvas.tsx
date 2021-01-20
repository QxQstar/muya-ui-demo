import React, { useEffect } from 'react';

import { draw } from './utils'

export default function CanvasLearn() {

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        draw(canvas!)
    }, []);

    return <canvas width="1100" height="600" style={{border: '1px solid'}}></canvas>
}