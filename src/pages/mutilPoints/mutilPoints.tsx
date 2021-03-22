import React, { useEffect } from 'react'
import { webglRender } from '../../libs/webglRender'

const vertex = `
attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 color;
void main(){
    color = a_color;
    gl_Position = a_position;
}
`

const fragment = `
precision mediump float;
uniform float u_w;
uniform float u_h;
varying vec4 color;
void main(){
    gl_FragColor = vec4(gl_FragCoord.x / u_w, 0.0, gl_FragCoord.y / u_h,1.0);
}
`


export default function MutilPoints() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
         const { gl, program }= webglRender(canvas, vertex, fragment);
        const points = new Float32Array([
            0.2,-0.9,1.0,0.0,0.0,
            -1.0,0.0,0.0,1.0,0.0,
            0.9,0.2,0.0,0.0,1.0
        ]);

        const buffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
        const FISZE = points.BYTES_PER_ELEMENT

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position,2,gl.FLOAT,false, FISZE * 5, 0)
        gl.enableVertexAttribArray(a_position);


        const a_color = gl.getAttribLocation(program, 'a_color')
        gl.vertexAttribPointer(a_color,3,gl.FLOAT,false, FISZE * 5, FISZE * 2)
        gl.enableVertexAttribArray(a_color);

        const u_w = gl.getUniformLocation(program,'u_w')
        gl.uniform1f(u_w,gl.drawingBufferWidth)

        const u_h = gl.getUniformLocation(program, 'u_h')
        gl.uniform1f(u_h, gl.drawingBufferHeight)

        gl.clearColor(0,1,1,1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES,0, points.length / 5)
    }, []);
    return <canvas width="300" height="300"/>
}