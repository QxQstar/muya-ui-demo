import React, { useEffect } from 'react';
import {webglRender, createBuffer} from '../../libs/webglRender';

const vertex = `
attribute vec4 a_position;
uniform mat4 u_translate; 
uniform mat4 u_rotate;
uniform mat4 u_salce;
void main(){
    gl_Position =  u_rotate * u_translate * u_salce * a_position;
}
`

const fragment = `
precision mediump float;
void main(){
    gl_FragColor = vec4(1,0.3,0.4,1.0);
}
`

export default function WebglTranslate() {
    let process = 0;
    const PERIOD = 2000;
    let start = 0;
    const update = (gl: WebGLRenderingContext, points: Float32Array, program: WebGLProgram) => {
        const dur = new Date().getTime() - start;
        // 新周期开始
        if (dur >= PERIOD) {
            process = 0;
            start = new Date().getTime();
        } else {
            process = dur / PERIOD;
        }
        gl.clearColor(0,0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT);
        const totalLength = 2;
        const translate = new Float32Array([
            1.0, 0,   0,0,
            0,   1.0, 0,0,
            0,   0,   1,0,
            totalLength * process,   0,   0,1
        ])
        const u_translate = gl.getUniformLocation(program,'u_translate')
        gl.uniformMatrix4fv(u_translate, false, translate)

        const totalRadian = 2 * Math.PI;
        const r = totalRadian * process;
        const cosr = Math.cos(r);
        const sinr = Math.sin(r);
        const rotate = new Float32Array([
            cosr, sinr,   0,0,
            -sinr, cosr, 0,0,
            0,   0,   1,0,
            0,   0,   0,1
        ])

        const u_rotate = gl.getUniformLocation(program,'u_rotate')
        gl.uniformMatrix4fv(u_rotate, false, rotate)

        const totalSize = 2;
        const curSalce = totalSize * process;
        const Salce = new Float32Array([
            curSalce, 0,   0,0,
            0, curSalce, 0,0,
            0,   0,   1,0,
            0,   0,   0,1
        ])
        const u_salce = gl.getUniformLocation(program,'u_salce')
        gl.uniformMatrix4fv(u_salce, false, Salce)

        gl.drawArrays(gl.TRIANGLES,0, points.length/2)

        requestAnimationFrame(() => update(gl, points, program))

    }
    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const { gl, program} = webglRender(canvas, vertex, fragment)

        const points = new Float32Array([
            -1,0.1,
            -1,-0.1,
            -0.9,-0.1
        ])

        createBuffer(gl, program, 'a_position', points,2)
        update(gl, points, program)

    }, []);
    return <canvas width="300" height="300"/>
}