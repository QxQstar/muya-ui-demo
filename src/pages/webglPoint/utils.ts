export default function drawPoint(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl')!;

    const vertex = `
    attribute vec2 a_position;
    attribute float a_pointSize;
    void main() {
        gl_Position     = vec4( a_position, 0.0, 1.0 );
        gl_PointSize     = a_pointSize;
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

    // 获取变量的地址
    const a_position = gl.getAttribLocation(program, 'a_position')
    // 往地址中传值
    gl.vertexAttrib2f(a_position, -1.0 ,0.0 )

    const a_pointSize = gl.getAttribLocation(program, 'a_pointSize')
    gl.vertexAttrib1f(a_pointSize, 25.0)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS,0,1)
}