import React, { useEffect } from 'react';
import {loadImg} from '../../libs/utils'

export default function CanvasGrayImg() {
    const copy = (sourceCtx: CanvasRenderingContext2D, sourceCanvas:HTMLCanvasElement) => {
        const imgData =sourceCtx.getImageData(0,0, sourceCanvas.width, sourceCanvas.height);
        
        for (let i = 0; i < imgData.data.length; i=i+4) {
            const r = imgData.data[i];
            const g = imgData.data[i + 1];
            const b = imgData.data[i + 2];
            const a = imgData.data[i + 3];

            const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            imgData.data[i] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = a;
        }

        const canvas = document.getElementById('canvas2') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')!
        canvas.width = sourceCanvas.width;
        canvas.height = sourceCanvas.height;
        ctx.putImageData(imgData, 0, 0)
    }
    useEffect(() => {
        ( async function () {
            const canvas = document.getElementById('canvas1') as HTMLCanvasElement
            const ctx = canvas.getContext('2d')!
            const Img = await loadImg('/WechatIMG27.jpeg')
            canvas.width = Img.width
            canvas.height = Img.height
            ctx.drawImage(Img, 0, 0)

            copy(ctx, canvas)
        })()
        

    }, []);
    return <>
        <canvas id="canvas1"/>
        <canvas id="canvas2"/>
    </>
}