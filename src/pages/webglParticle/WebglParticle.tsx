import React, { useEffect } from 'react'

const vertex = `
attribute vec4 a_position;
uniform mat4 u_rotate;
uniform mat4 u_translate;
uniform mat4 u_sacle;
varying vec4 color;
void main(){
    gl_Position = u_sacle * u_translate * u_rotate * a_position;
    color = gl_Position * 0.5 + 0.5;
}
`
const fragment = `
precision mediump float;
varying vec4 color;
void main(){
    gl_FragColor = color;
}
`

export default function WebglParticle() {

    const createTrangle = (): number[] => {
        const result: number[] = [];
        // 50 个三角形
        for (let i = 0; i < 3; i++) {
            const random1 = Math.random()
            const random2 = Math.random()
            // 第一个点
            result.push((random1 - random2) * -1 * Math.random(), (random1 - random2) * Math.random(),0,1)
            // 第二个点
            result.push((random1 - random2) * -1 * Math.random(),(random1 - random2) * -1 * Math.random(),0,1)
            // 第三个点
            result.push((random1 - random2) * Math.random(),(random1 - random2) * -1 * Math.random(),0,1)
        }
        return result;
    }

    const update = (trangles: Float32Array, gl: WebGLRenderingContext, program: WebGLProgram) => {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        // 旋转角度
        const rotate = Math.random() * Math.PI * 2
        const cosR = Math.cos(rotate);
        const sinR = Math.sin(rotate);
        const mat4Rotate = new Float32Array([
            cosR,     sinR, 0.0,0.0,
            sinR * -1, cosR,0.0,0.0,
            0.0,         0.0,   1.0,0.0,
            0.0,         0.0,   0.0,1.0
        ])
        const u_rotate = gl.getUniformLocation(program, 'u_rotate')
        gl.uniformMatrix4fv(u_rotate, false, mat4Rotate)

        // 移动
        const translateX =Math.sin( Math.random() * Math.PI)
        const translateY = Math.cos( Math.random() * Math.PI)
        const mat4Translate = new Float32Array([
            1.0,        0.0,         0, 0,
            0.0,        1.0,         0, 0,
            0.0,        0.0,         1, 0,
            translateX, translateY,  0, 1,
        ])
        const u_translate = gl.getUniformLocation(program,'u_translate')
        gl.uniformMatrix4fv(u_translate, false,mat4Translate)

        // 缩放
        const sacleX = Math.random() * 3;
        const sacleY = Math.random() * 3;
        const mat4Sacle = new Float32Array([
            sacleX,0,     0,0,
            0,     sacleY,0,0,
            0,     0,     1,0,
            0,     0,     0,1
        ])
        const u_sacle = gl.getUniformLocation(program, 'u_sacle');
        gl.uniformMatrix4fv(u_sacle,false,mat4Sacle)
        
        gl.drawArrays(gl.TRIANGLES, 0, trangles.length/4)

        requestAnimationFrame(() => {
            update(trangles, gl, program)
        })
    }

    useEffect(() => {
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

        const trangles = new Float32Array(createTrangle());

        const positionBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, trangles, gl.STATIC_DRAW)

        const vPosition = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        update(trangles, gl, program)
        
    }, [])
    return <canvas width="400" height="400"/>
}