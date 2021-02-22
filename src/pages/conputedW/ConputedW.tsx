import React, { useState, useEffect } from 'react';

function useConputedW() {
    const [w, setW] = useState<number>()

    useEffect(() => {
        function onResize() {
            const body = document.body.getBoundingClientRect()
            setW(body.width)
        }
        
        onResize()

        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        };
    }, []);

    return w
}

export default function ConputedW() {
    const w = useConputedW()
    return <div>w: {w}</div>
}