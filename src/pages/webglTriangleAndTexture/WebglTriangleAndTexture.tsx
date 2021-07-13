import React from 'react'
import { createBuffer } from '../../libs/webglRender'

const textureVertex = `
attribute vec4 a_position;
attribute vec2 a_texture;
varying vec2 v_texture;

void main(){
    gl_Position = a_position;
    v_texture = a_texture;
}
`

const textureFragment = `
precision mediump float;
varying vec2 v_texture;
uniform sampler2D u_sampler;

void main(){
    gl_FragColor = texture2D(u_sampler, v_texture);
}
`

const triangleVertex = `
attribute vec2 a_position_t;
void main(){
    gl_Position = vec4(a_position_t, -1.0, 1.0);
}
`

const triangleFragment = `
precision mediump float;
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`

export default class WebglTriangleAndTexture extends React.Component<{}, {}> {

    gl?: WebGLRenderingContext;
    textureProgram?: WebGLProgram;
    triangleProgram?: WebGLProgram;

    componentDidMount() {
        this.createGl();

        this.textureProgram = this.compileShader(textureVertex, textureFragment)
        this.triangleProgram = this.compileShader(triangleVertex, triangleFragment)

        const gl = this.gl!;

        gl.clearColor(0.0,0.0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT)

        this.drawTexture()

    }

    drawTexture() {
        const position = new Float32Array([
            -1, 1,
            -1, -1,
            1,1,
            1,-1,
        ])

        const texturePosition = new Float32Array([
            0.0, 1.0,
            0.0, 0.0,
            1.0,1.0,
            1.0,0.0
        ])

        this.gl!.useProgram(this.textureProgram!)

        createBuffer(this.gl!, this.textureProgram!, 'a_position', position, 2, this.gl!.FLOAT)
        createBuffer(this.gl!, this.textureProgram!, 'a_texture', texturePosition, 2, this.gl!.FLOAT)

        const texture = this.gl!.createTexture();
        const u_sampler = this.gl!.getUniformLocation(this.textureProgram!, 'u_sampler')

        const image = new Image()

        image.onload = () => {
            const gl = this.gl!;

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

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            this.drawTriangle()

        }

        image.src="/WechatIMG27.jpeg"
    }

    drawTriangle() {
        const gl = this.gl!

        const position = new Float32Array([
            0.2, 0.6,
            -0.5, 0.5,
            -0.5, -0.5,
        ])

        gl.useProgram(this.triangleProgram!)

        createBuffer(gl, this.triangleProgram!, 'a_position_t', position, 2, gl.FLOAT)

        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    createGl() {
        const canvas = document.querySelector('canvas')!
        this.gl = canvas.getContext('webgl')!
    }

    compileShader(vertex: string, fragment: string) {
        const gl = this.gl!

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, vertex)
        gl.compileShader(vertexShader)

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram()!;

        gl.attachShader(program, vertexShader)
        gl.attachShader(program,fragmentShader)

        gl.linkProgram(program)

        return program;
    }

    render() {
        return <canvas width='800px' height='400px'/>
    }
}
