
function drawRect(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const rectW = 100, rectH = 100
    context.save()

    context.translate(0.5 * rectW * -1, 0.5 * rectH * -1)
    context.fillStyle = 'red'
    context.beginPath()
    context.rect(canvas.width / 2, canvas.height / 2, rectW, rectH)
    context.fill();

    context.restore()
}

function drawCal(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const r = 100
    context.save()

    context.beginPath()
    context.fillStyle = '#ebe'
    context.translate(r, r)
    context.arc(0,0,r,0,2*Math.PI)
    context.fill();

    context.restore()
}

export function draw(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')!
    drawRect(canvas, context)
    drawCal(canvas, context)
}