import React, { useEffect } from 'react'
import Vector2D from '../../libs/vector2D'
import earcut from '../../libs/earcut'

const vertex = `
attribute vec4 a_position;
varying vec4 color;

void main(){
    gl_PointSize = 5.0;
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

export default function WebglStar() {

    const createPoints = (): Vector2D[] => {
        const v0 = new Vector2D(0,-1)
        const points = [v0.copy().scale(0.5)];
        for(let i = 1; i <= 9; i++) { 
            const p = v0.copy().rotate(i * Math.PI * 0.2); 
            if (i % 2) {
                points.push(p.scale(1));
            } else {
                points.push(p.scale(0.5));
            }
            
        }

        return points
    }

    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const gl = canvas.getContext("webgl")!

        const vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, vertex);
        gl.compileShader(vertexShader);

        const fragmentShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);

        const program: WebGLProgram = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        gl.useProgram(program)

        // 生成正五角星的顶点
        const vertices = createPoints()
        const fillArray = new Array(10).fill(1)
        const starVertices:number[][] = fillArray.map((item,index) => {
            return [vertices[index].x, vertices[index].y]
        })
        const points = starVertices.flat();

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
        // gl.disableVertexAttribArray(vPosition)
        // console.log(position,'fff')
        // gl.vertexAttrib3f(vPosition,position[0], position[1], 0);
        // gl.drawArrays(gl.POINTS,0,1)

        // gl.vertexAttrib3f(vPosition,position[2], position[3], 0);
        // gl.drawArrays(gl.POINTS,0,1)

    }, []);
    return <canvas/>
}