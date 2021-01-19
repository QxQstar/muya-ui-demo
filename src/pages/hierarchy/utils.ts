var d3Hierarchy = require("d3-hierarchy")

async function dealData() {
    const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
    const data = await (await fetch(dataSource)).json();
  const regions = d3Hierarchy.hierarchy(data)
    .sum((d: any) => 1)
    .sort((a: any, b: any) => b.value - a.value);

  const pack = d3Hierarchy.pack()
    .size([1200, 600])
    .padding(3);

  return pack(regions);
}

function getColor(depth: number) {
    if (depth === 0) {
        return '#ebebeb';
    } else if (depth === 1) {
        return '#789'
    } else if (depth === 2) {
        return '#345'
    } else {
        return '#333'
    }
}


export async function startDraw(canvas: HTMLCanvasElement) {
    const root = await dealData()

    console.log(root)

    const context = canvas.getContext('2d')!

    function draw(data: any) {
        context.beginPath()
        context.fillStyle = getColor(data.depth)
        context.arc(data.x, data.y, data.r, 0, 2 * Math.PI)
        context.fill()

        if (data.children && data.children.length) {
            data.children.map(draw)
        } else {
            context.beginPath()
            context.fillStyle = '#fff'
            context.font = '8px serif';
            context.textAlign = 'center';
            const text = context.measureText(data.data.name)
            context.fillText(data.data.name, data.x, data.y + 3);
        }
    }

    draw(root)

}