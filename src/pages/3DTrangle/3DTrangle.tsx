import React, { useEffect } from 'react'

import { webglRender } from '../../libs/webglRender'
import { Matrix4 } from '../../libs/cuon-matrix';

const vertex = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 color;
uniform mat4 u_orthoMatix;
void main(){
    color = a_color;
    gl_Position =  u_orthoMatix * vec4(a_position,1.0);
}
`

const fragment = `
precision mediump float;
varying vec3 color;
void main(){
    gl_FragColor = vec4(color, 1.0);
}
`

export function ThreeTrangle() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!
        const { program, gl } = webglRender(canvas, vertex, fragment)

        const data = new Float32Array([
            0.2, -0.1, -0.4, 0.2,0.3,0.4,
            0.2, 0.9, -0.4, 0.2,0.3,0.7,
            -0.2, 0.5, -0.4, 0.5,0.3,0.7, // 蓝色

            0.5, -0.4, -0.2, 0.4,0.3,0.4,
            -0.2, 0.4, -0.2, 0.5,0.3,0.7,
            0.0, -0.5, -0.2, 0.7,0.3,0.3, // 红色

            0.2, -0.1, 0, 0.2,0.5,0.4, // 绿色
            0.4, 0.3, 0, 0.2,0.7,0.7,
            -0.2, 0.5, 0, 0.5,0.9,0.3,
        ])

        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_position);

        const a_color = gl.getAttribLocation(program, 'a_color')
        gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * BYTES_PER_ELEMENT, 3 * BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(a_color);

        const matrix4 = new Matrix4()

        const u_orthoMatix = gl.getUniformLocation(program, 'u_orthoMatix')
        
        let near = 0, far = 0.1;

        document.addEventListener('keydown', function (event: KeyboardEvent) {
            if (event.keyCode === 39) { // right
                near += 0.01
            } else if (event.keyCode === 37) { // left
                near -= 0.01
            } else if (event.keyCode === 38) { // top
                far += 0.01
            } else if (event.keyCode === 40) { // down
                far -= 0.01
            }

            darw()
        }, false)

        function darw() {

            matrix4.setOrtho(-1,1,-1,1,near,far)

            gl.uniformMatrix4fv(u_orthoMatix, false, matrix4.elements)
            gl.clearColor(0,0,0, 1)
            gl.clear(gl.COLOR_BUFFER_BIT)
    
            gl.drawArrays(gl.TRIANGLES,0, 9)
        }

        darw()
        

    }, []);

    return <canvas width={400} height={400}/>
}