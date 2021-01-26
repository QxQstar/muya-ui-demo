export default function draw(canvas: HTMLCanvasElement) {
    // 创建 webgl 上下文

    const gl: WebGLRenderingContext = canvas.getContext('webgl')!

    // 编写顶点着色器和片元着色器代码片段
    const vertex = `
    attribute vec2 position;
    varying vec3 color;
    

    void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.0);
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
    }
    `;


    const fragment = `
    precision mediump float;
    varying vec3 color;

    void main()
    {
        gl_FragColor = vec4(color, 1.0);
    }    
    `;

    // 创建着色器 shader

    const vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    // 创建 WebGLProgram 对象，将着色器添加到 WebGLProgram 上，将 WebGLProgram 对象链接到 WebGL 上下文对象上

    const program: WebGLProgram = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // 启动 WebGLProgram 对象
    gl.useProgram(program)

    // 定义三角形顶点坐标
    const points = new Float32Array([
        -1, -1,
        0, 1,
        1, -1,
    ]);

    // 创建缓冲对象，将顶点写入缓冲对象中
    const bufferId: WebGLBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

    // 将 buffer 数据绑定给顶点着色器的 position 变量上

    const vPosition = gl.getAttribLocation(program, 'position')
    gl.vertexAttribPointer(vPosition,2, gl.FLOAT,false,0,0)
    gl.enableVertexAttribArray(vPosition);

    // 执行绘制指令
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    // 绘制实心三角型
    gl.drawArrays(gl.TRIANGLES,0,points.length/2)
    // 绘制空心三角型
    // gl.drawArrays(gl.LINE_LOOP,0,points.length/2)
}