interface IWebglRender {
    program: WebGLProgram;
    gl: WebGLRenderingContext;
}

export function webglRender(canvas: HTMLCanvasElement, vertex: string, fragment: string): IWebglRender {
    const gl = canvas.getContext('webgl')!;
    const program = gl.createProgram()!;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertex)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    gl.attachShader(program, vertexShader)
    gl.attachShader(program,fragmentShader)

    gl.linkProgram(program)
    gl.useProgram(program);

    return {
        program,
        gl
    }
}

export function createBuffer(gl: WebGLRenderingContext, program: WebGLProgram , location: string, data: Float32Array, size: number, type: number) {
    const buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    const aLocation = gl.getAttribLocation(program, location)
    gl.vertexAttribPointer(aLocation, size, type, false, 0, 0);
    gl.enableVertexAttribArray(aLocation);

    // gl.bindBuffer(gl.ARRAY_BUFFER, null);
}