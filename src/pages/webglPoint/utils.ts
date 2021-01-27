export default function drawPoint(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl')!;

    const vertex = `
    void main() {
        gl_Position     = vec4(.0, .0, .0, 1.0);
        gl_PointSize     = 10.0;
    }
    `
    const fragment = `
    void main()
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `

    const vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertex)
    gl.compileShader(vertexShader)

    const fragmentShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragment)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    gl.useProgram(program)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS,0,1)
}