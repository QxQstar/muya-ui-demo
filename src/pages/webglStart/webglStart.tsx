import React, { useEffect } from 'react';

import draw from './utils';

export default function WebglStart() {

    useEffect(() => {
        const canvas = document.querySelector('canvas')!

        draw(canvas);
    }, []);

    return (
        <canvas width='500' height='500'></canvas>
    )
}