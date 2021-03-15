import React, { useEffect } from 'react';
import { webglRender } from '../../libs/webglRender'
import earcut from '../../libs/earcut'
import Vector2D from '../../libs/vector2D';

const vertex = `
#define PI 3.1415926535897932384626433832795
attribute vec4 a_position;
varying vec4 color;
vec3 hsv2rgb(vec3 c){ 
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0); 
    rgb = rgb * rgb * (3.0 - 2.0 * rgb); 
    return c.z * mix(vec3(1.0), rgb, c.y);
}
void main(){
    float hue = atan(a_position.y, a_position.x);
    if (0.0 > hue) {
        hue = 2.0 * PI + hue;
    }
    hue /= 2.0 * PI;
    float y = a_position.y;
    float x = a_position.x;
    float len = sqrt(x * x + y * y);
    vec3 hsv = vec3(hue,len,1.0);
    color = vec4(hsv2rgb(hsv),1.0);
    gl_Position = a_position;
}
`

const fragment = `
precision mediump float;
varying vec4 color;
void main(){
    gl_FragColor = color;
}
`

export default function WebglColor() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;

        const { gl, program } = webglRender(canvas, vertex, fragment)

        const vertices = []
        let v0 = new Vector2D(1,0);
        for(let i = 0; i< 100; i++) {
            const v1 = v0.copy().rotate( Math.PI * 2 / 100 * i)
            vertices.push([v1.x, v1.y])
        }

        const points = vertices.flat();
        const triangles = earcut(points);

        const position = new Float32Array(points)
        const cells = new Uint16Array(triangles)

        const positionBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

        const vPosition = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        const cellsBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW)

        gl.clear(gl.COLOR_BUFFER_BIT)
        // gl.drawArrays(gl.TRIANGLES, 0, points.length/2)
        gl.drawElements(gl.TRIANGLES, cells.length, gl.UNSIGNED_SHORT, 0)
    }, []);
    return <canvas width="80" height="80"/>
}