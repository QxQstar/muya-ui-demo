import React, { useEffect } from 'react';
import {loadImg, getImageData, traverse, IRGBA, gaussianBlur } from '../../libs/utils'
import { transformColor, brightness } from '../../libs/color-matrix'

export default function CanvasGrayImg() {
    useEffect(() => {
        ( async function () {
            const canvas = document.getElementById('canvas1') as HTMLCanvasElement
            const ctx = canvas.getContext('2d')!
            const Img = await loadImg('/WechatIMG27.jpeg')
            canvas.width = Img.width 
            canvas.height = Img.height

            const imgData = traverse(getImageData(Img), ({r, g, b, a}: IRGBA): number[] => {
                return transformColor([r,g,b,a], brightness(0.8))
            })

            gaussianBlur(imgData.data, imgData.width, imgData.height, 10, 1.5)
            ctx.putImageData(imgData, 0, 0)
        })()
        

    }, []);
    return <>
        <canvas id="canvas1"/>
    </>
}