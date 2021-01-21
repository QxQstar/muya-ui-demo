interface ILine {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

interface IBlock {
    x: number,
    y: number,
    font: string
}

interface IData {
    line: ILine[],
    block: IBlock[]
}

enum GameStatus {
    start,
    miss,
    success,
    fail
}

export default class CanvasGame {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private data: IData;
    private blockColor = ['#123','#234','#345','#456','#567','#678','#789', '#890','#90a','#0ab','#abc','#bcd','#cde','#024','#653','#a75']
    
    private currentFont: string = ''
    private startTime: number = 0
    private requestAnimationFrameId: number = 0
    
    private mouseX: number = -1
    private mouseY: number = -1

    private status: GameStatus = GameStatus.start

    // 每2s新开一局
    static interval: number = 2000
    static readonly blockW: number = 50
    static readonly bloxkH: number = 50

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        this.data = this.createData()
    }

    createData() {
        const createLineData = (): ILine[] => {
            const line: ILine[] = []
            const arr = [0,1,2,3,4]
            // 创建纵向的线
            arr.map(item => {
                line.push({
                    x1: 70 * item,
                    y1: 0,
                    x2: 70 * item,
                    y2: 4 * 70
                })
            })

            // 创建横向的线
            arr.map(item => {
                line.push({
                    x2: 4 * 70,
                    y2: item * 70,
                    x1: 0,
                    y1: item * 70
                })
            })

            return line
        }

        const createBlockData = (): IBlock[] => {
            const blocks: IBlock[] = [];
            const arr = [0,1,2,3]
            arr.forEach(i => {
                arr.forEach(j => {
                    blocks.push({
                        y: 10 + i * 70,
                        x: 10 + j * 70,
                        font: ''
                    })
                })
            })
            return blocks
        }

        return {
            line: createLineData(),
            block: createBlockData()
        }
    }

    drawLine() {
        const { line } = this.data;
        this.ctx.beginPath()
        this.ctx.strokeStyle = '#789'

        line.forEach(item => {
            this.ctx.moveTo(item.x1, item.y1)
            this.ctx.lineTo(item.x2, item.y2)
        })

        this.ctx.stroke()
    }

    lineGrad(x: number,y: number, color: string): CanvasGradient {
        const grad = this.ctx.createLinearGradient(x,y,x + 50,y)
        grad.addColorStop(0,color)
        grad.addColorStop(0.5,'#fff')
        grad.addColorStop(1, color)
        return grad;
    }

    createBlockFont() {
        const { block } = this.data;

        block.forEach(item => {
            item.font = Math.floor(Math.random() * 4) + ''
        })

    }

    blockIfHover = (block: IBlock): boolean => {
        if (this.mouseY === -1 || this.mouseX === -1) {
            return false
        }

        if (block.x < this.mouseX && block.x + CanvasGame.blockW > this.mouseX &&
            block.y < this.mouseY && block.y + CanvasGame.bloxkH > this.mouseY) {
                return true
            }

        return false
    }

    drawBlockBorder = (block: IBlock) => {
        let strokeStyle = ''

        if (this.blockIfHover(block)) {
            strokeStyle = 'blue';
        } else {
            strokeStyle = '#fff'
        }

        this.ctx.beginPath()
        this.ctx.strokeStyle = strokeStyle
        this.ctx.strokeRect(block.x - 1 , block.y - 1, CanvasGame.blockW + 2, CanvasGame.bloxkH + 2)
    }


    drawBlock() {
        const { block } = this.data;

        block.forEach((item) => {
            this.ctx.beginPath()
            this.ctx.clearRect(item.x - 1 , item.y - 1, CanvasGame.blockW + 2, CanvasGame.bloxkH + 2)
            this.ctx.fillStyle = this.lineGrad(item.x, item.y, this.blockColor[ Math.floor(Math.random() * 16) ])
            this.ctx.fillRect(item.x, item.y, CanvasGame.blockW, CanvasGame.bloxkH)
            
            this.drawBlockBorder(item);

            this.ctx.save();
            this.ctx.beginPath()
            this.ctx.translate(25,30)
            this.ctx.fillStyle = '#333'
            this.ctx.font = "bold 18px serif";
            this.ctx.textAlign = 'center'
            this.ctx.fillText(item.font,item.x, item.y)
            this.ctx.restore()
        })
    }

    drawFont() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#333'
        this.ctx.font = "bold 18px serif";
        this.ctx.fillText(`点击汉字为${this.currentFont}的方块`,0,330)
    }
    
    drawProgress() {
        const computedPropress = (): number => {
            const now = new Date().getTime();
            return (now - this.startTime) / CanvasGame.interval
        }

        const width = 300;

        const currentPropress = computedPropress()
        

        this.ctx.save()
        this.ctx.beginPath();
        const lineGrad = this.ctx.createLinearGradient(0, 350, 340, 350)
        lineGrad.addColorStop(0, '#fff')
        lineGrad.addColorStop(1, 'red')
        this.ctx.strokeStyle = lineGrad

        // 在这里设置线条的属性，在之后一定要还原回去
        this.ctx.lineWidth = 20;
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(20, 360);
        this.ctx.lineTo(20 + currentPropress * width, 360);
        this.ctx.stroke()
        this.ctx.restore()

        this.requestAnimationFrameId = requestAnimationFrame(() => {
            this.drawProgress();
        })
    }

    drawGameResult() {

        this.ctx.clearRect(300, 0, 300, 300)
        this.ctx.beginPath();
        let font = ''

        if (this.status === GameStatus.start) {
            font = 'fighting...'
        } else if (this.status === GameStatus.miss) {
            font = 'missing'
        } else if( this.status === GameStatus.success) {
            font = '真厉害'
        } else {
            font = '真遗憾，再来一次吧'
        }

        this.ctx.font = '20px'
        this.ctx.fillStyle = 'red'
        this.ctx.fillText(font,300,30)
    }

    draw() {
        this.drawLine();
        this.drawBlock();
        this.drawFont();
        this.drawProgress();
        this.drawGameResult();
    }

    mouseMove(x: number,y: number) {
        this.mouseX = x;
        this.mouseY = y;

        const { block } = this.data;

        block.forEach(item => {
            this.drawBlockBorder(item)
        })
    }

    hintBlock(x: number,y: number) {
        const { block } = this.data;
        let hintedBlock

        for(let i = 0 ; i < block.length ; i++) {
            if (this.blockIfHover(block[i])) {
                hintedBlock = block[i];
                break;
            }
        }

        // 没有击中方块
        if (!hintedBlock) {
            this.status = GameStatus.miss
        } else if (hintedBlock.font === this.currentFont) {
            this.status = GameStatus.success
        } else {
            this.status = GameStatus.fail
        }

        this.drawGameResult();
    }



    start() {
        cancelAnimationFrame(this.requestAnimationFrameId);

        this.status = GameStatus.start;
        this.currentFont = Math.floor(Math.random() * 4) + ''
        this.startTime = new Date().getTime();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.createBlockFont();

        this.draw()

        setTimeout(() => {
            this.start();
        }, CanvasGame.interval);

    }

}

