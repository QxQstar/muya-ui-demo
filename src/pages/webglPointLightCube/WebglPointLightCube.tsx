import React, { useEffect } from 'react'
import { webglRender, createBuffer } from '../../libs/webglRender';
import { Matrix4 } from '../../libs/cuon-matrix';

const vertex = `
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec4 a_normal;

uniform vec3 u_point_light_color;
uniform vec3 u_point_light_position;

uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_normalMatrix;

varying vec4 v_color;

void main(){
    gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_position;

    vec3 u_light_dir = normalize(u_point_light_position - (u_modelMatrix * a_position).xyz);
    vec3 normal = normalize((u_normalMatrix * a_normal).xyz);

    float dotL = max(dot(u_light_dir, normal), 0.0);

    vec3 u_ambient_light_color = vec3(0.2,0.2,0.2);
    vec3 ambient = u_ambient_light_color * a_color.rgb;

    vec3 diffuse = u_point_light_color * a_color.rgb * dotL;

    v_color = vec4(diffuse + ambient, a_color.a);
}
`

const fragment = `
precision mediump float;
varying vec4 v_color;
void main(){
    gl_FragColor = v_color;
}
`

export default function WebglPointLightCube() {
    useEffect(() => {
       const canvas = document.querySelector('canvas')!
        const { gl, program } = webglRender(canvas, vertex, fragment)

        var vertices = new Float32Array([   // Coordinates
            1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
            1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0, // v0-v3-v4-v5 right
            1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
           -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
           -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 down
            1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0  // v4-v7-v6-v5 back
         ]);
       
       
         var colors = new Float32Array([    // Colors
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
           1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
        ]);
       
       
         var normals = new Float32Array([    // Normal
           0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
           1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
           0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
          -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
           0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
           0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
         ]);

         createBuffer(gl, program, 'a_position', vertices, 3, gl.FLOAT)
         createBuffer(gl, program, 'a_color', colors, 3, gl.FLOAT)
         createBuffer(gl, program, 'a_normal', normals, 3, gl.FLOAT)

         // Indices of the vertices
        var indices = new Uint8Array([
            0, 1, 2,   0, 2, 3,    // front
            4, 5, 6,   4, 6, 7,    // right
            8, 9,10,   8,10,11,    // up
            12,13,14,  12,14,15,    // left
            16,17,18,  16,18,19,    // down
            20,21,22,  20,22,23     // back
        ]);


        const indexBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

        var u_point_light_color = gl.getUniformLocation(program, 'u_point_light_color')
        gl.uniform3f(u_point_light_color, 1,1,1);

        var u_point_light_position = gl.getUniformLocation(program, 'u_point_light_position')
        gl.uniform3f(u_point_light_position, 2.3, 4.0, 3.5)

        const viewMatrix = new Matrix4()
        viewMatrix.setLookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)
        const u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
        gl.uniformMatrix4fv(u_viewMatrix,false, viewMatrix.elements)

        const projMatrix = new Matrix4()
        projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 200)
        const u_projMatrix = gl.getUniformLocation(program, 'u_projMatrix')
        gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements)

        const modelMatrix = new Matrix4()
        modelMatrix.setRotate(90, 0, 1, 0)
        const u_modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix');
        gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)

        const normalMatrix = new Matrix4()
        normalMatrix.setInverseOf(modelMatrix)
        normalMatrix.transpose();
        const u_normalMatrix = gl.getUniformLocation(program, 'u_normalMatrix')
        gl.uniformMatrix4fv(u_normalMatrix, false, normalMatrix.elements)

        gl.clearColor(0,0,0,1)
        gl.enable(gl.DEPTH_TEST)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)
    }, []);
    return <canvas width={400} height={400}/>
}