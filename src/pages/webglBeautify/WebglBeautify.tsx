import React, { useEffect } from 'react';
import { webglRender } from '../../libs/webglRender';

const vertex = `
attribute vec4 a_position;
attribute vec2 a_texture;
varying vec2 v_texture;

void main(){
    gl_Position = a_position;
    v_texture = a_texture;
}
`

const fragment = `
precision mediump float;
varying vec2 v_texture;
uniform sampler2D u_sampler;
uniform sampler2D u_sunlight;
uniform mat4 u_colorMatrix;

void main(){
    vec4 color = texture2D(u_sampler, v_texture);
    gl_FragColor = u_colorMatrix * vec4(color.rgb, 1.0);
    gl_FragColor.a = color.a;
}
`
export default function WebglBeautify() {

    let count = 0

    const loadedImage = (gl: WebGLRenderingContext, texture:  WebGLTexture, u_sampler: WebGLUniformLocation, img: HTMLImageElement, index: number) => {
        count ++;

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        if (index === 0) {
            gl.activeTexture(gl.TEXTURE0)
        } else {
            gl.activeTexture(gl.TEXTURE1)
        }
       
        gl.bindTexture(gl.TEXTURE_2D,texture)

        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, img);

        // 当纹理比填充区域大的时候纹理会被缩小，TEXTURE_MIN_FILTER 会起作用
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
        

        // 当纹理比填充区域小的时候图片会被放大，TEXTURE_MAG_FILTER 会起作用
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // 从纹理上取颜色，让坐标取值在 （0，1）之外时，TEXTURE_WRAP_S 和 TEXTURE_WRAP_T 会起作用
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
   
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.uniform1i(u_sampler, index)

        if (count === 2) {
            gl.clearColor(0,0,0,1)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.bindTexture(gl.TEXTURE_2D,null)
    
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
        
    }

    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const { program, gl } = webglRender(canvas, vertex, fragment);

        // 创建顶点坐标和纹理坐标
        const data = new Float32Array([
            -1, 1, 0.0, 1.0,
            -1, -1, 0.0, 0.0,
            1,1, 1.0,1.0,
            1,-1, 1.0,0.0
        ])

        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;

        // 创建 buffer 并且把坐标传入 buffer 中
        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position,2, gl.FLOAT, false, BYTES_PER_ELEMENT * 4, 0)
        gl.enableVertexAttribArray(a_position)

        const a_texture = gl.getAttribLocation(program, 'a_texture')
        gl.vertexAttribPointer(a_texture,2, gl.FLOAT, false, BYTES_PER_ELEMENT * 4, BYTES_PER_ELEMENT * 2)
        gl.enableVertexAttribArray(a_texture)

        // 生成颜色滤镜
        const r = 1.5;
        const g = 1;
        const b = 0.9;
        const colorMatrix = new Float32Array([
            r,0,0,0,
            0,g,0,0,
            0,0,b,0,
            0,0,0,1,
        ])

        const u_colorMatrix = gl.getUniformLocation(program, 'u_colorMatrix')
        gl.uniformMatrix4fv(u_colorMatrix,false, colorMatrix);


        const texture = gl.createTexture()!
        const texture2 = gl.createTexture()!
        const u_sampler = gl.getUniformLocation(program, 'u_sampler')!
        const u_sunlight = gl.getUniformLocation(program, 'u_sunlight')!

        const img = new Image()
        const img2 = new Image()
        img.onload = () => {
            loadedImage(gl, texture, u_sampler, img, 0)
        }

        img2.onload = () => {
            loadedImage(gl, texture2, u_sunlight, img2, 1)
        }

        img.src = "/douluo.jpeg"
        img2.src = "/sunlight.png"
    }, []);
    return <canvas width="512" height="256"/>
}