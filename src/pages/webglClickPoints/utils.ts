interface IPoint {
    x: number;
    y: number;
}

interface IColor {
    red: number;
    green: number;
    blue: number;
}

export default class DrawPoint {
    points: IPoint[] = []
    pointColors: IColor[] = []
    canvas: HTMLCanvasElement
    gl:  WebGLRenderingContext
    program: WebGLProgram
    

    static vertexSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
    `
    static frageSoutce = `
    precision mediump float;
    uniform vec3 u_FragColor;
    void main() {
        gl_FragColor = vec4(u_FragColor, 1.0);
    }
    `

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl')!
        this.program = this.gl.createProgram()!

        this.initShader()
        this.clear()
    }

    initShader() {
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)!
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)!

        this.gl.shaderSource(vertexShader, DrawPoint.vertexSource)
        this.gl.shaderSource(fragmentShader, DrawPoint.frageSoutce)

        this.gl.compileShader(vertexShader)
        this.gl.compileShader(fragmentShader)

        
        this.gl.attachShader(this.program, vertexShader)
        this.gl.attachShader(this.program, fragmentShader)
        this.gl.linkProgram(this.program)
        this.gl.useProgram(this.program)
    }

    setValueToPosition(x: number, y: number) {
        const a_postion = this.gl.getAttribLocation(this.program, 'a_position')
        this.gl.vertexAttrib2f(a_postion, x, y)
    }

    setValueToColor(red: number, green: number, blue: number) {
        const u_FragColor = this.gl.getUniformLocation(this.program, 'u_FragColor')
        this.gl.uniform3f(u_FragColor, red, green, blue)
    }

    draw(pIndex: number) {
        const {x,y} = this.points[pIndex];
        const {red, blue, green} = this.pointColors[pIndex]
        this.setValueToPosition(x, y)
        this.setValueToColor(red, green, blue)
        this.gl.drawArrays(this.gl.POINTS,0,1)
    }

    addPoint(x: number, y: number) {
        this.points.push({
            x,y
        })
        this.pointColors.push({
            red: x,
            green: y,
            blue: 0.5
        })

        this.clear();
        for(let i = 0; i < this.points.length; i ++) {
            this.draw(i)
        }
    }

    clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    clearPoints() {
        this.points = []
        this.clear();
    }
}