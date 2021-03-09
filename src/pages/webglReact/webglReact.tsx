import React, { useEffect } from 'react'
import Vector2D from '../../libs/vector2D'

const vertex = `
attribute vec4 a_position;
uniform vec2 u_rotate;
void main(){
    gl_Position.x = a_position.x * u_rotate.x - a_position.y * u_rotate.y;
    gl_Position.y = a_position.x * u_rotate.y + a_position.y * u_rotate.x;
    gl_Position.z = a_position.z;
    gl_Position.w = 1.0;
}
`
const fragment = `
precision mediump float;
void main(){
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1);
}
`

export default function WebglReact() {

    const createPoints = (): Float32Array => {
        const v0 = new Vector2D(0.5,0.5)
        const vector :Vector2D[] = []
        for (let i = 1; i <= 4 ; i++) {
            const v1 = v0.copy().rotate(Math.PI * 0.5 * i)
            vector.push(v1)
        }

        const points: number[][] = []
        vector.forEach(item => {
            points.push([item.x, item.y])
        })

        return new Float32Array(points.flat())

    }
    useEffect(() => {
        const position = createPoints();
        const canvas = document.querySelector('canvas')!
        const gl = canvas.getContext("webgl")!
        const program = gl.createProgram()!

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vertexShader, vertex)
        gl.compileShader(vertexShader)

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(fragmentShader, fragment)
        gl.compileShader(fragmentShader)

        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program);
        gl.useProgram(program)

        const positionBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

        const vRotate = gl.getUniformLocation(program, 'u_rotate')
        gl.uniform2f(vRotate,0.5,0.9)

        const vPosition = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_FAN, 0, position.length/2)
        
    }, [])
    return <canvas width="200" height="200"/>
}