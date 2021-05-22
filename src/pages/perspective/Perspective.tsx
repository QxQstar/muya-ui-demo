import React, { useEffect } from 'react'
import { webglRender } from '../../libs/webglRender'
import { Matrix4 } from '../../libs/cuon-matrix';

const vertex = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;
uniform mat4 u_viewMatrix;
uniform mat4 u_proMatrix;
uniform mat4 u_modelMatrix;
void main() {
    gl_Position = u_proMatrix * u_viewMatrix * u_modelMatrix * vec4(a_position, 1.0);
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

export default function Perspective() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const { gl, program } = webglRender(canvas, vertex, fragment)

        const data = new Float32Array([

            // 0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色
            // 0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
            // 1.25, -1.0, -4.0, 0.4, 1.0, 0.4,

            // 0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
            // 0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
            // 1.25, -1.0, -2.0, 1.0, 1.0, 0.4, // 黄色

            // 0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
            // 0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
            // 1.25, -1.0, 0.0, 0.4, 0.4, 1.0, // 蓝色

            // -0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
            // -1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
            // -0.25, -1.0, -4.0, 0.4, 1.0, 0.4,

            // -0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
            // -1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
            // -0.25, -1.0, -2.0, 1.0, 1.0, 0.4,

            // -0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
            // -1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
            // -0.25, -1.0, 0.0, 0.4, 0.4, 1.0,

            0.0, 1.0, 0.0, 0.4, 0.4, 1.0,
            -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
            0.75, -1.0, 0.0, 0.4, 0.4, 1.0, // 蓝色

            0.0, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色
            -0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
            0.75, -1.0, -4.0, 0.4, 1.0, 0.4,

            0.0, 1.0, -2.0, 1.0, 1.0, 0.4,
            -0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
            0.75, -1.0, -2.0, 1.0, 1.0, 0.4, // 黄色

        ])

        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;
        const buffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_position);

        const a_color = gl.getAttribLocation(program, 'a_color')
        gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 3 * BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(a_color);

        const u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
        const viewMatix = new Matrix4()
        viewMatix.setLookAt(0,0,3, 0,0, -1, 0, 1, 0)
        gl.uniformMatrix4fv(u_viewMatrix, false, viewMatix.elements)

        const u_proMatrix = gl.getUniformLocation(program, 'u_proMatrix')
        const proMatrix = new Matrix4()
        proMatrix.setPerspective(30, canvas.width / canvas.height, 1, 200)
        gl.uniformMatrix4fv(u_proMatrix, false, proMatrix.elements)

        const u_modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix')
        const modelMatrix = new Matrix4()
        modelMatrix.setTranslate(0.75, 0, 0)
        gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)

        gl.enable(gl.DEPTH_TEST)
        gl.enable(gl.POLYGON_OFFSET_FILL)
        gl.clearColor(0,0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.drawArrays(gl.TRIANGLES, 0, 9)

        modelMatrix.setTranslate(-0.75, 0, 0)
        gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)
        gl.polygonOffset(0.1,0.1)
        gl.drawArrays(gl.TRIANGLES, 0, 9)

    }, []);

    return <canvas width={300} height={300}/>
}