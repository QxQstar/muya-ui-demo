import React from 'react'
import { webglRender, createBuffer } from '../../libs/webglRender';

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
}
`

export default class WebglVideo extends React.Component<{}, {}>{
    video: HTMLVideoElement
    gl?: WebGLRenderingContext
    program?: WebGLProgram

    constructor(props: {}) {
        super(props)

        this.video = document.createElement('video');
        
    }

    loadVideo = () => {
        this.video.setAttribute("crossorigin", "anonymous");
        this.video.setAttribute("webkit-playsinline", "");
        this.video.setAttribute("playsinline", "");
        this.video.src = "/L1D0S81ENDIK6EDTVSGFCSOLUF3P3WG888.mp4"
        this.video.volume = 0
        this.video.currentTime = 0

        this.video.autoplay = true
        this.video.loop = true
        
       this.video.onloadeddata = () => {
           this.gl!.canvas.width = this.video.videoWidth
           this.gl!.canvas.height = this.video.videoHeight
            waitLoad()
       }

        const waitLoad = () => {
            this.draw()
            requestAnimationFrame(waitLoad)
        }
    }

    preLoadVideo(url: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const video  = document.createElement('video')
    
            video.addEventListener("loadedmetadata", function () {
                resolve()
            });
    
            video.src = url
            video.preload = 'metadata'
        })
    }

    play = () => {
        this.video.play()
    }

    async componentDidMount() {
        const {gl, program} = webglRender(document.querySelector('canvas')!, vertex, fragment)
        this.gl = gl
        this.program = program

        createBuffer(gl, program, 'a_position', new Float32Array([
            -1, 1,
            -1, -1,
            1,1,
            1,-1,
        ]), 2, gl.FLOAT)

        createBuffer(gl, program, 'a_texture', new Float32Array([
            0.0, 1.0,
            0.0, 0.0,
            1.0,1.0,
            1.0,0.0
        ]), 2, gl.FLOAT)

        const texture = gl.createTexture()!

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

        const u_sampler = gl.getUniformLocation(program, 'u_sampler')

        gl.uniform1i(u_sampler, 0)

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 12, 255]))
    

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        this.loadVideo()
    }

    draw = () => {
        const gl = this.gl!

        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, this.video)

        gl.clearColor(0.0,0.0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    render() {
        return <div>
        <canvas width='1280' height='720' onClick={this.play}/>
        </div> 
    }
}