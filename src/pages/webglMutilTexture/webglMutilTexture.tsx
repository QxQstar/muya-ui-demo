import React, { useEffect } from 'react';

import { webglRender } from '../../libs/webglRender'

const vertex = `
attribute vec4 a_position;
attribute vec2 a_texture;
varying vec2 v_texture;
void main(){
    v_texture = a_texture;
    gl_Position = a_position;
}
`
const fragment = `
precision mediump float;
varying vec2 v_texture;
uniform sampler2D u_sampler0;
uniform sampler2D u_sampler1;
void main(){
    gl_FragColor = texture2D(u_sampler0, v_texture) * texture2D(u_sampler1, v_texture);
}
`

export default function WebglMutilTexture() {
    const initVertext = function (gl: WebGLRenderingContext, program: WebGLProgram) {
        const data = new Float32Array([
            -1, 1, 0.0, 1.0,
            -1, -1, 0.0, 0.0,
            1,1, 1.0,1.0,
            1,-1, 1.0,0.0
        ])

        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 4 * BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_position);

        const a_texture = gl.getAttribLocation(program, 'a_texture');
        gl.vertexAttribPointer(a_texture, 2, gl.FLOAT, false, 4 * BYTES_PER_ELEMENT, 2 * BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(a_texture);
    }
    let actived0 = false;
    let actived1 = false;
    const loadTexture = function (image: HTMLImageElement, texture: WebGLTexture, u_sampler: WebGLUniformLocation, unit: 0 | 1, gl: WebGLRenderingContext) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        
        if (unit === 0) {
            gl.activeTexture(gl.TEXTURE0)
            actived0 = true;
        } else {
            gl.activeTexture(gl.TEXTURE1)
            actived1 = true;
        }

        gl.bindTexture(gl.TEXTURE_2D,texture)

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, image)
        gl.uniform1i(u_sampler, unit)

        if (actived0 && actived1) {     
            gl.clearColor(0,0,0,1)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLE_STRIP,0,4)
        }
    }

    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const {program, gl} = webglRender(canvas, vertex, fragment)
        initVertext(gl, program)

        const texture0 = gl.createTexture()!
        const texture1 = gl.createTexture()!
        const u_sampler0 = gl.getUniformLocation(program, 'u_sampler0')!
        const u_sampler1 = gl.getUniformLocation(program, 'u_sampler1')!

        const img0 = new Image()
        const img1 = new Image()
        
        img0.onload = function () {
            loadTexture(img0, texture0, u_sampler0, 0, gl)
        }
        img1.onload = function () {
            loadTexture(img1, texture1, u_sampler1, 1, gl)
        }

        img0.src = '/WechatIMG27.jpeg';
        img1.src = '/logo512.png';
    }, []);
    return <canvas width={300} height={300}/>
}