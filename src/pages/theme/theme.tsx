import React from 'react'

import ract from './react.svg'

export default class Theme extends React.Component<{}>{
    
    componentDidMount() {
        const canvas = document.querySelector('canvas')!
        const context = canvas.getContext('2d')!
       
        const canvasVisibleH = parseInt(canvas.style.height)
        const canvasVisibleW = parseInt(canvas.style.width)

        canvas.height = canvasVisibleH * devicePixelRatio
        canvas.width = canvasVisibleW * devicePixelRatio

        context.scale(devicePixelRatio, devicePixelRatio);

        const img = new Image()

        img.onload = function() {
            if (img.width/img.height > canvasVisibleW / canvasVisibleH) {
                const imgVisibleH = canvasVisibleW * (img.height / img.width)
                context.drawImage(img,0,Math.abs((canvasVisibleH - imgVisibleH)/2),canvasVisibleW, imgVisibleH)
            } else {
                const imgVisibleW = canvasVisibleH * (img.width/img.height)
                context.drawImage(img,Math.abs(( canvasVisibleW - imgVisibleW ) / 2),0,imgVisibleW , canvasVisibleH)
            }
            
        }
        img.src = ract;
    }
    

    render() {
        return (<div>
                <img src={ract} alt='svg' style={{marginBottom: '10px'}}/>
                <canvas style={{width: '400px', height: '600px'}}></canvas>
            </div>)
    }
}