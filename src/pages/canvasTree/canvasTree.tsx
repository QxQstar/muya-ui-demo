import React, {useEffect} from 'react';
import Vector2D from '../../libs/vector2D'

export default function CanvasTree() {
    const drawTrangle = (context: CanvasRenderingContext2D, v0: Vector2D, length: number, thickness: number, dir: number) => {
        const v = new Vector2D(1,0).rotate(dir).scale(length)
        const v1 = v0.copy().add(v)

        context.beginPath()
        context.strokeStyle = '#000'
        context.lineWidth = thickness
        context.lineCap = "round"
        context.moveTo(v0.x, v0.y)
        context.lineTo(v1.x, v1.y)
        context.stroke();

        if (thickness < 5 && Math.random() > 0.6) {
            context.beginPath()
            context.lineWidth = thickness + 4 * Math.random();
            context.moveTo(v1.x, v1.y)
            context.lineTo(v1.x, v1.y -2)
            context.strokeStyle= 'red'
            context.stroke();
        }

        if (thickness > 2) {
            // left
            const left = dir - Math.random() * Math.PI * 0.4
            drawTrangle(context, v1, length * 0.9, thickness * 0.8, left)
            // right
            const right = dir + Math.random() * Math.PI * 0.4
            drawTrangle(context, v1, length * 0.9, thickness * 0.8, right)
        }
    }

    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const context = canvas.getContext('2d')!

        // 坐标转换
        context.save()
        context.translate(0, canvas.height)
        context.scale(1,-1)
        drawTrangle(context, new Vector2D(200,0),70, 8, Math.PI * 0.5)
        context.restore();
    }, []);

    return <canvas width="400" height="400" id="canvas"/>
}