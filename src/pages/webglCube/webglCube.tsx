import React, { useEffect } from 'react'
import { webglRender } from '../../libs/webglRender'
import { Matrix4 } from '../../libs/cuon-matrix';

const vertex = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;
uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
void main() {
    gl_Position =  u_projMatrix * u_viewMatrix * vec4(a_position, 1.0);
    v_color = a_color;
}
`

const fragment = `
precision mediump float;
varying vec3 v_color;
void main(){
    gl_FragColor = vec4(v_color, 1.0);
}
`

export default function WebglCube () {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        const { gl, program } = webglRender(canvas, vertex, fragment);
        
        const vertexAndColor = new Float32Array([
            1.0,1.0,1.0,1.0,1.0,1.0,
            -1.0,1.0,1.0,1.0,0.0,1.0,
            -1.0,-1.0,1.0,1.0,0.0,0.0,
            1.0,-1.0,1.0,1.0,1.0,0.0,
            1.0,-1.0,-1.0,0.0,1.0,0.0,
            1.0,1.0,-1.0,0.0,1.0,1.0,
            -1.0,1.0,-1.0,0,0.0,1.0,
            -1.0,-1.0,-1.0,0.0,0.0,0.0
        ])

        const indices = new Uint8Array([
            0,1,2,0,2,3,
            0,3,4,0,4,5,
            0,5,6,0,6,1,
            1,6,7,1,7,2,
            7,4,3,7,3,2,
            4,7,6,4,6,5
        ])

        const vertexAndColorBuffer = gl.createBuffer()!
        const indexBuffer = gl.createBuffer()!

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexAndColorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertexAndColor, gl.STATIC_DRAW)

        const BYTES_PER_ELEMENT = vertexAndColor.BYTES_PER_ELEMENT;

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_position);

        const a_color = gl.getAttribLocation(program, 'a_color')
        gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 3 * BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(a_color);

     
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

        const viewMatrix = new Matrix4()
        viewMatrix.setLookAt(3,3,10, 0,0,0, 0,1,0)

        const u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
        gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);

        const projMatrix = new Matrix4()
        projMatrix.setPerspective(30, canvas.width / canvas.height, 1,100)
    
        const u_perjMatrix = gl.getUniformLocation(program, 'u_projMatrix')
        gl.uniformMatrix4fv(u_perjMatrix, false, projMatrix.elements);

        gl.clearColor(0,0,0,1)
        gl.enable(gl.DEPTH_TEST)
       
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

        
        gl.drawElements(gl.TRIANGLES, indices.length,gl.UNSIGNED_BYTE, 0)
    }, []);

    return <canvas width={300} height={300}/>
}