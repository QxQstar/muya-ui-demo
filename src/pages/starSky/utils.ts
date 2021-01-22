
interface IStarData {
    r: number;
    translateX: number;
    translateY: number;
    rotate: number;
}

export default class StarSky {
    
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private starsData: IStarData[]

    constructor(canvas: HTMLCanvasElement,) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')!
        
        this.starsData = this.createStarsData()
        this.draw()
    }

    createStarsData(): IStarData[] {
        const result: IStarData[] = [];

        const arr = new Array(130).fill(0,0);
        const getRandom = (max: number) => {
            return Math.ceil( Math.random() * max )
        }
        arr.forEach(() => {
            const r = getRandom(20)
            const star: IStarData = {
                r,
                translateX: getRandom(this.canvas.width - r),
                translateY: getRandom(this.canvas.height - r),
                rotate: 2*Math.PI*Math.random()
            }

            result.push(star);
        })

        return result
    }

    brawBackground() {
        this.context.beginPath();

        const grand = this.context.createLinearGradient(0,0,0,this.canvas.height)
        grand.addColorStop(0,'#232256')
        grand.addColorStop(1, '#143778')

        this.context.fillStyle = grand;

        this.context.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.drawStars(0.3);
    }

    drawStar(r: number) {
        this.context.beginPath();
      
        this.context.fillStyle = 'yellow'

        const r1 = r / 2;
        const r2 = r1 / 2;
        var x1,x2,y1,y2;
        for (var i = 0; i < 5; i++) {
          x1 = r1 * Math.cos((54 + i*72)/180*Math.PI);
          y1 = r1 * Math.sin((54 + i*72)/180*Math.PI);
          x2 = r2 * Math.cos((18 + i*72)/180*Math.PI);
          y2 = r2 * Math.sin((18 + i*72)/180*Math.PI);
        
          this.context.lineTo(x2, y2);
          this.context.lineTo(x1, y1);
        }
      
        this.context.closePath();
        this.context.fill();
    }

    drawStars(globalAlpha: number = 1) {
        this.context.save();
        
        this.context.globalAlpha = globalAlpha
        this.starsData.forEach((item) => {
            this.context.save();
            this.context.translate(item.translateX, item.translateY)
            this.context.rotate(item.rotate)
            this.drawStar(item.r);
            this.context.restore();
        })

        this.context.restore()
    }

    clip(x: number = 150,y: number = 150) {
        this.context.beginPath();
        this.context.arc(x,y,50,0,2*Math.PI)
        this.context.clip()
    }

    move(x: number,y: number) {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.clip(x,y);
        this.draw()
    }
    
    draw() {
        this.brawBackground();
    }
}