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

async function createSvgImg(): Promise<SVGSVGElement>{
    const root = await dealData()
    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgRoot.setAttribute('width', '1200')
    svgRoot.setAttribute('height', '600')
    svgRoot.setAttribute('version', '1.1')

    function draw(parent: any, nodeData: any) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', nodeData.r)
        circle.setAttribute('cx', nodeData.x)
        circle.setAttribute('cy', nodeData.y)
        circle.setAttribute('fill', getColor(nodeData.depth))
        parent.appendChild(circle);

        if (nodeData.children && nodeData.children.length) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            nodeData.children.forEach((child: any) => {
                draw(g, child)
            });
            parent.appendChild(g)
        } else {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', nodeData.x)
            text.setAttribute('y', nodeData.y)
            text.setAttribute('text-anchor', 'middle')
            text.setAttribute('font-size', '10')
            text.setAttribute('fill', '#fff')
            text.textContent = nodeData.data.name
            parent.appendChild(text)
        }
    }

    draw(svgRoot, root)

    return svgRoot;
}

export async function drawHierarchyBySvg(svgContainer: HTMLDivElement) {
    const svgRoot = await createSvgImg()
    svgContainer.appendChild(svgRoot)
}


export async function drawHierarchyByCanvas(canvas: HTMLCanvasElement) {
    const svgRoot = await createSvgImg()

    const context = canvas.getContext('2d')!
    // context.drawImage(svgRoot,0,0)
    // const img = new Image()
    // img.onload = function() {

    // }

    // img.src = svgRoot;
}