import React from 'react'
import { Matrix4 } from '../../libs/cuon-matrix'

const OFFSCREEN_WIDTH = 256
const OFFSCREEN_HEIGHT = 256

var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();

var currentAngle = 0.0;
var last = Date.now();

const VSHADER_SOURCE_TEXTURE = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_MvpMatrix;
varying vec2 v_TexCood;

void main(){
    gl_Position = u_MvpMatrix * a_Position;
    v_TexCood = a_TexCoord;
}
`

const FSHADER_SOURCE_TEXTURE = `
precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_TexCood;

void main(){
    gl_FragColor = texture2D(u_Sampler, v_TexCood);
}
`

const VSHADER_SOURCE_COLOR = `
attribute vec4 a_Position;
uniform mat4 u_MvpMatrix;
void main(){
    gl_Position = u_MvpMatrix * a_Position;

}
`

const FSHADER_SOURCE_COLOR = `
precision mediump float;
void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

interface Buffer {
    num: number,
    type: number,
    buffer: WebGLBuffer
}

interface BufferGroup {
    vertexBuffer: Buffer;
    texCoordBuffer?: Buffer;
    indexBuffer: Buffer;
    numIndices: number;
    a_Position: number;
    a_TexCoord: number;
    u_MvpMatrix: WebGLUniformLocation;
}

interface FBO {
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
}

export default class FramebufferObjectColor extends React.Component<{}, {}>{
    gl?: WebGLRenderingContext;
    programColor?: WebGLProgram;
    programTexture?: WebGLProgram;
    bufferForCube?: BufferGroup;
    bufferForPlane?: BufferGroup;
    texture?: WebGLTexture;
    fbo?: FBO;

    a_Position?: number
    a_TexCoord?: number
    u_MvpMatrix?: WebGLUniformLocation

    viewProjMatrix?: Matrix4
    viewProjMatrixFBO?: Matrix4


    render() {
        return <canvas width="500" height="300"/>
    }

    componentDidMount() {
       this.createGL()
       this.programColor = this.compileShader(VSHADER_SOURCE_COLOR, FSHADER_SOURCE_COLOR)
       this.programTexture = this.compileShader(VSHADER_SOURCE_TEXTURE, FSHADER_SOURCE_TEXTURE)

        const gl = this.gl!

        this.bufferForCube = this.initVertexBuffersForCube()
        this.bufferForPlane = this.initVertexBuffersForPlane()

        this.fbo = this.initFramebufferObject()

        gl.enable(gl.DEPTH_TEST);

        var viewProjMatrix = new Matrix4();   // Prepare view projection matrix for color buffer
        viewProjMatrix.setPerspective(30, gl.canvas.width/gl.canvas.height, 1.0, 100.0);
        viewProjMatrix.lookAt(0.0, 0.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
        this.viewProjMatrix = viewProjMatrix

        var viewProjMatrixFBO = new Matrix4();   // Prepare view projection matrix for FBO
        viewProjMatrixFBO.setPerspective(30.0, OFFSCREEN_WIDTH/OFFSCREEN_HEIGHT, 1.0, 100.0);
        viewProjMatrixFBO.lookAt(0.0, 2.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
        this.viewProjMatrixFBO = viewProjMatrixFBO

        this.tick()
    }

    createGL() {
        const canvas = document.querySelector('canvas')!
        this.gl = canvas.getContext('webgl')!
    }

    compileShader(VSHADER_SOURCE: string, FSHADER_SOURCE: string): WebGLProgram {
        const gl = this.gl!

        const frag = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(frag, FSHADER_SOURCE)
        gl.compileShader(frag)

        const vsha = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vsha, VSHADER_SOURCE)
        gl.compileShader(vsha)

        const pro = gl.createProgram()!
        gl.attachShader(pro, frag)
        gl.attachShader(pro, vsha)

        gl.linkProgram(pro)
        
        return pro
    }

    tick() {
        currentAngle = this.animate(currentAngle);
        this.draw(currentAngle)
        requestAnimationFrame(() => this.tick())
    }

    animate(angle: number) {
        var now = Date.now(); // Calculate the elapsed time
        var ANGLE_STEP = 30;  
        var elapsed = now - last;
        last = now;
        // Update the current rotation angle (adjusted by the elapsed time)
        var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
        return newAngle % 360;
    }

    initVertexBuffersForCube() {
        var vertices = new Float32Array([
            1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
            1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
            1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
           -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
           -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
            1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
         ]);
       
         // Indices of the vertices
         var indices = new Uint8Array([
            0, 1, 2,   0, 2, 3,    // front
            4, 5, 6,   4, 6, 7,    // right
            8, 9,10,   8,10,11,    // up
           12,13,14,  12,14,15,    // left
           16,17,18,  16,18,19,    // down
           20,21,22,  20,22,23     // back
         ])

        const gl = this.gl!
        const program = this.programColor!
        gl.useProgram(program)

        return {
            vertexBuffer: this.createBufferForLaterUse(vertices, 3, gl.FLOAT),
            indexBuffer: this.initElementArrayBufferForLaterUse(indices, gl.UNSIGNED_BYTE),
            numIndices: indices.length,
            a_Position:  gl.getAttribLocation(program, 'a_Position'),
            u_MvpMatrix: gl.getUniformLocation(program, 'u_MvpMatrix')!,
            a_TexCoord: 0
        }
    }

    initVertexBuffersForPlane() {
        var vertices = new Float32Array([
            1.0, 1.0, 0.0,  -1.0, 1.0, 0.0,  -1.0,-1.0, 0.0,   1.0,-1.0, 0.0    // v0-v1-v2-v3
          ]);
        
          // Texture coordinates
          var texCoords = new Float32Array([1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0]);
        
          // Indices of the vertices
          var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);

          const gl = this.gl!
          const program = this.programTexture!
          gl.useProgram(program)

          return {
            vertexBuffer: this.createBufferForLaterUse(vertices, 3, gl.FLOAT),
            texCoordBuffer: this.createBufferForLaterUse(texCoords, 2, gl.FLOAT),
            indexBuffer: this.initElementArrayBufferForLaterUse(indices, gl.UNSIGNED_BYTE),
            numIndices: indices.length,
            a_Position:  gl.getAttribLocation(program, 'a_Position'),
            u_MvpMatrix: gl.getUniformLocation(program, 'u_MvpMatrix')!,
            a_TexCoord: gl.getAttribLocation(program, 'a_TexCoord')
        }
    }

    initTextures() {
        const gl = this.gl!
        const program = this.programColor!

        gl.useProgram(program)
        const texture = gl.createTexture()!
        const u_Sampler = gl.getUniformLocation(program, 'u_Sampler')

        const image = new Image()
        image.onload = () => {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
            gl.bindTexture(gl.TEXTURE_2D, texture)

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, image)
            gl.uniform1i(u_Sampler, 0);

            gl.bindTexture(gl.TEXTURE_2D, null)
        }

        image.src="/WechatIMG27.jpeg"

        return texture
    }

    initFramebufferObject() {
        const gl = this.gl!

        // 创建帧缓冲区对象
        const framebuffer = gl.createFramebuffer()!

        // 创建纹理对象，这个纹理对象将绑定到帧缓冲区对象的关联纹理对象上
        const texture = gl.createTexture()!
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // 创建渲染缓冲对象, 这个渲染缓冲对象将绑定到帧缓冲区对象的关联深度对象上
        const depthBuffer = gl.createRenderbuffer()!
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT)

        // 将纹理对象和渲染缓冲对象绑定到帧缓冲对象上
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer)


        gl.bindRenderbuffer(gl.RENDERBUFFER, null)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.bindTexture(gl.TEXTURE_2D, null)

        return {
            framebuffer,
            texture
        }
    }

    draw(angle: number) {
        const gl = this.gl!

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo!.framebuffer)
        gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Set a viewport for FBO

        gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
        this.drawTexturedCube(angle)

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);   
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); 
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer

        this.drawTexturedPlane(angle);  // Draw the plane
    }

    drawTexturedCube(angle: number) {
        const gl = this.gl!

        gl.useProgram(this.programColor!)
        g_modelMatrix.setRotate(20.0, 1.0, 0.0, 0.0);
        g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);

        g_mvpMatrix.set(this.viewProjMatrixFBO!);
        g_mvpMatrix.multiply(g_modelMatrix);

        gl.uniformMatrix4fv(this.bufferForCube!.u_MvpMatrix!, false, g_mvpMatrix.elements);

        this.drawTexturedObject(this.bufferForCube!, this.programColor!);
    }

    drawTexturedPlane(angle: number) {
        const gl = this.gl!

        gl.useProgram(this.programTexture!)
        g_modelMatrix.setTranslate(0, 0, 1);
        g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
        g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);

        // Calculate the model view project matrix and pass it to u_MvpMatrix
        g_mvpMatrix.set(this.viewProjMatrix);
        g_mvpMatrix.multiply(g_modelMatrix);
        gl.uniformMatrix4fv(this.bufferForPlane!.u_MvpMatrix!, false, g_mvpMatrix.elements);

        this.drawTexturedObject(this.bufferForPlane!,this.programTexture!, this.fbo!.texture);
    }

    drawTexturedObject(o: BufferGroup, program: WebGLProgram, texture?: WebGLTexture) {
        const gl = this.gl!

        gl.useProgram(program)
        this.initAttributeVariable(o.a_Position, o.vertexBuffer); 
        if (o.texCoordBuffer && texture) {
            this.initAttributeVariable(o.a_TexCoord!, o.texCoordBuffer)

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
        }

        // Draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer.buffer);
        gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);
    }

    initAttributeVariable(a_attribute: number, buffer: Buffer) {
        const gl = this.gl!

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
    }

    createBufferForLaterUse(data: Float32Array, num: number, type: number): Buffer {
        const gl = this.gl!
        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        return {
            num,
            type,
            buffer
        }
    }

    initElementArrayBufferForLaterUse(data: Uint8Array, type: number): Buffer {
        const gl = this.gl!
        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)

        return {
            type,
            num: 3,
            buffer
        }
    }
}