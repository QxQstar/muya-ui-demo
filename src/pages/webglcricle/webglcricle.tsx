import React, { Fragment, useEffect } from 'react';
import Vector2D from '../../libs/vector2D'
import earcut from '../../libs/earcut'

const vertex = `
attribute vec4 a_position;
varying vec4 color;
void main(){
    gl_PointSize = 1.0;
    color = 0.5 + a_position * 0.5;
    gl_Position = a_position;
}
`

const fragment = `
precision mediump float;
varying vec4 color;
void main(){
    gl_FragColor = color;
}
`

export default function Webglcricle() {


    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        const gl = canvas.getContext('webgl')!;
        const program = gl.createProgram()!;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, vertex)
        gl.compileShader(vertexShader)

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);

        gl.attachShader(program, vertexShader)
        gl.attachShader(program,fragmentShader)

        gl.linkProgram(program)
        gl.useProgram(program);

        const vertices = []
        let v0 = new Vector2D(1,0);
        for(let i = 0; i< 180; i++) {
            const v1 = v0.copy().rotate( Math.PI / 180 * i)
            vertices.push([v1.x, v1.y])
        }
        v0 = new Vector2D(-1,0);
        for(let i = 0; i< 180; i++) {
            const v1 = v0.copy().rotate( Math.PI / 180 * i)
            vertices.push([v1.x, v1.y])
        }

        const points = vertices.flat();
        const triangles = earcut(points);

        const position = new Float32Array(points)
        const cells = new Uint16Array(triangles)

        const positionBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

        const vPosition = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        const cellsBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW)

        gl.clear(gl.COLOR_BUFFER_BIT)
        
        gl.drawElements(gl.TRIANGLES, cells.length, gl.UNSIGNED_SHORT, 0)


    }, []);
    return <canvas width="300" height="300"/>
}