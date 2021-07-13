import React, {useEffect} from 'react';
import { webglRender } from '../../libs/webglRender';

const vertex = `
attribute vec4 a_position;
attribute vec2 a_texture;
varying vec2 v_texture;

void main(){
    gl_Position =  a_position;
    v_texture = a_texture;
}
`
const fragment = `
precision mediump float;
varying vec2 v_texture;
uniform sampler2D u_sampler;

void main(){
    gl_FragColor = texture2D(u_sampler, v_texture);
    // gl_FragColor = vec4(v_texture, 1.0, 1.0);
}
`

export default function WebglTexture() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const {program, gl} = webglRender(canvas, vertex, fragment)

        // 使用缓存对象往顶点着色器中传值
        const data = new Float32Array([
            -1, 1, 0.0, 1.0,
            -1, -1, 0.0, 0.0,
            1,1, 1.0,1.0,
            1,-1, 1.0,0.0
        ])

        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT

        // 往顶点着色器中传递顶点坐标和纹理坐标
        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position,2, gl.FLOAT, false, BYTES_PER_ELEMENT * 4, 0)
        gl.enableVertexAttribArray(a_position)

        const a_texture = gl.getAttribLocation(program, 'a_texture')
        gl.vertexAttribPointer(a_texture,2, gl.FLOAT, false, BYTES_PER_ELEMENT * 4, BYTES_PER_ELEMENT * 2)
        gl.enableVertexAttribArray(a_texture)

        // 创建纹理对象，并且准备好纹理图片
        const texture = gl.createTexture()!
        const u_sampler = gl.getUniformLocation(program, 'u_sampler')
        var image = new Image()

        image.onload = function () {
            const IW = image.width
            const IH = image.height

            const CW = canvas.width
            const CH = canvas.height

            let height = CH
            let width = CW;

            if (IW / IH > CW / CH) {
                width = Math.min(IW, CW)
                height = IH / IW * width
            } else {
                height = Math.min(CH, IH)
                width = IW / IH * height
            }

            const x = Math.abs((CW - width) / 2)
            const y = Math.abs((CH - height) / 2)

            gl.viewport(x,y, width, height)

            // 将纹理图像进行 Y 轴翻转
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

            // 激活第 0 纹理单元，至少有8个纹理单元
            gl.activeTexture(gl.TEXTURE0)
            // 将纹理对象绑定到目标
            gl.bindTexture(gl.TEXTURE_2D,texture)
            
            // 规定纹理图像要怎么填充
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // 将纹理图像分配给纹理对象
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, image)

            // 将 0 号纹理单元传递给片元着色器
            gl.uniform1i(u_sampler, 0)

            // 绘制
            gl.clearColor(0.0,0.0,0,1)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
        
        // image.src='/logo512.png'

        image.src="/WechatIMG27.jpeg"
    }, []);
    return <>
        <canvas width="1000" height="300"/>
    </>
    
}