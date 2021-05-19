import React, { useEffect } from 'react'

import { webglRender } from '../../libs/webglRender';

const vertex = `
attribute vec2 a_position;
attribute vec2 a_texture;
varying vec2 vUv;

void main(){
    vUv = a_texture;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`
const fragment = `
precision mediump float;
varying vec2 vUv;
uniform vec2 u_mouse;
float computed_d(in vec2 st, in vec2 a, in vec2 b) {
    vec3 ab = vec3(b - a, 0.0);
    vec3 p = vec3(st - a, 0.0);
    float l = length(ab);
    
    float d = abs(cross(p, normalize(ab)).z);
    float proj = dot(p, ab) / l;

    if (proj >= 0.0 && proj <= l) return d;
    else return min(distance(st, a), distance(st, b));
}

float line_d(in vec2 st, in vec2 a, in vec2 b) {
    vec3 ab = vec3(b - a, 0.0);
    vec3 p = vec3(st - a, 0.0);

    return cross(p, normalize(ab)).z;
}

float triangle_d(in vec2 st, in vec2 a, in vec2 b, in vec2 c) {
    float d1 = line_d(st, a, b);
    float d2 = line_d(st, b, c);
    float d3 = line_d(st, c, a);

    if (d1 > 0.0 && d2 > 0.0 && d3 > 0.0 || d1 < 0.0 && d2 < 0.0 && d3 < 0.0) {
        return -0.1;
    }

    return min(computed_d(st, a,b), min(computed_d(st, b, c), computed_d(st, c, a)));
}
void main(){
    float d = triangle_d(vUv, vec2(0.3), vec2(0.5, 0.7), vec2(0.7, 0.3));
    gl_FragColor.rgb = (1.0 - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor.a = 1.0;
}
`

export default function WebglGeometry() {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!

        const {gl, program} = webglRender(canvas, vertex, fragment);

        const data = new Float32Array([
            -1, 1, 0.0, 1.0,
            -1, -1, 0.0, 0.0,
            1,1, 1.0,1.0,
            1,-1, 1.0,0.0
        ])
        const BYTES_PER_ELEMENT = data.BYTES_PER_ELEMENT;
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

        const a_position = gl.getAttribLocation(program, 'a_position')
        gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,4 * BYTES_PER_ELEMENT, 0)
        gl.enableVertexAttribArray(a_position)

        const a_texture = gl.getAttribLocation(program, 'a_texture')
        gl.vertexAttribPointer(a_texture,2,gl.FLOAT,false,4 * BYTES_PER_ELEMENT, 2 * BYTES_PER_ELEMENT)
        gl.enableVertexAttribArray(a_texture)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0,4)
        

        canvas.addEventListener('mousemove', function (event: MouseEvent) {
            const target = this;
            const {x,y,width, height} = target.getBoundingClientRect()
            const mouseX = event.x - x;
            const mouseY = event.y - y;
            const u_mouse = gl.getUniformLocation(program, 'u_mouse')
            gl.uniform2f(u_mouse, mouseX / width, 1- mouseY / height)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0,4)
        }, false)
    }, []);
    return <canvas width="300" height="300"/>
}