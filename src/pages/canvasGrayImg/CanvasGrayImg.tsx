import React, { useEffect } from 'react';
import {loadImg, getImageData, traverse, IRGBA, gaussianBlur, getPixels } from '../../libs/utils'
import { transformColor, brightness, saturate } from '../../libs/color-matrix'

export default function CanvasGrayImg() {
    useEffect(() => {
        ( async function () {
            const canvas = document.getElementById('canvas1') as HTMLCanvasElement
            const ctx = canvas.getContext('2d')!
            const Img = await loadImg('/WechatIMG27.jpeg')
            const texture = await loadImg('/sunlight.png')
            canvas.width = Img.width 
            canvas.height = Img.height

            const textureImagedata = getImageData(texture);
            const imgData = traverse(getImageData(Img), ({r, g, b, a,index}: IRGBA): number[] => {
                const { a: aOfTexture } = getPixels(textureImagedata, index);
                return transformColor([r,g,b,a], saturate(2 - aOfTexture), brightness(1 + 0.7 * aOfTexture))
            })

            // gaussianBlur(imgData.data, imgData.width, imgData.height, 10, 1.5)
            ctx.putImageData(imgData, 0, 0)
        })()
        

    }, []);
    return <>
        <canvas id="canvas1"/>
    </>
}