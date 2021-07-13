import React, { useEffect } from 'react'
import { webglRender } from '../../libs/webglRender'

const vertex = `
attribute vec2 a_position;
attribute vec2 a_texture;
varying vec2 v_texture;

void main() {
    gl_Position = vec4(a_position * vec2(2.0) - vec2(1.0, 1.0), 0.0, 1.0);
    v_texture = a_texture;
}
`

const fragment = `
precision mediump float;
varying vec2 v_texture;
uniform sampler2D u_sampler;

void main(){
    gl_FragColor = texture2D(u_sampler, v_texture);
}`

export default function() {

    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const { gl, program } = webglRender(canvas, vertex, fragment)

        const position = new Float32Array([
            0.7, 0,
            1.0, 0.7,
            0.0, 1.0
        ])

        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(a_position)
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0,0)

        const a_texture = gl.getAttribLocation(program, 'a_texture')
        gl.enableVertexAttribArray(a_texture)
        gl.vertexAttribPointer(a_texture, 2, gl.FLOAT, false, 0,0)

        const texture = gl.createTexture()!
        const u_sampler = gl.getUniformLocation(program, 'u_sampler')

        var image = new Image()

        image.onload = () => {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, texture)

            // 规定纹理图像要怎么填充
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, image)

            // 将 0 号纹理单元传递给片元着色器
            gl.uniform1i(u_sampler, 0)

            gl.clearColor(1,0,0,1)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.drawArrays(gl.TRIANGLES, 0, 3)

        }

        image.src="/WechatIMG27.jpeg"

    }, [])

    return <canvas width='400px' height='400px'/>
}