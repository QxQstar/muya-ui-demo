import React, { useEffect } from 'react';

import drawPoint from './utils'

export default function WebGLPoint() {

    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        drawPoint(canvas)
    }, []);

    return <canvas width="400" height="400"/>
}