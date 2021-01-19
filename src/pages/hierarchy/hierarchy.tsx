import React, { useEffect } from 'react'
import { startDraw } from './utils'

export default function Hierarchy() {

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        startDraw(canvas!)
        
    }, []);

    return <div>
        <canvas width="1200" height="600"></canvas>
    </div>
}