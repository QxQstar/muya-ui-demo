export function loadImg(src: string) {
    return new Promise<HTMLImageElement>((resove, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            resove(img);
        }
        img.onerror = function() {
            reject();
        }
        img.src = src
    })
}

const imageDataContext = new WeakMap<HTMLImageElement, OffscreenCanvasRenderingContext2D>();
export function getImageData(img: HTMLImageElement) {
    let context: OffscreenCanvasRenderingContext2D;
    if (imageDataContext.has(img)) {
        context = imageDataContext.get(img)!;
    } else {
        const canvas = new OffscreenCanvas(img.width, img.height);
        context = canvas.getContext('2d')!; 
        context.drawImage(img, 0, 0); 
        imageDataContext.set(img, context);
    }

    return context.getImageData(0, 0, img.width, img.height);
}

export interface IRGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    index: number;
    width: number;
    height: number;
    x: number;
    y: number
} 

  // 循环遍历 imageData 数据
export function traverse(imageData: ImageData, pass: (param: IRGBA) => number[]) {
    const {width, height, data} = imageData;
    for(let i = 0; i < width * height * 4; i += 4) {
      const [r, g, b, a] = pass({
        r: data[i] / 255,
        g: data[i + 1] / 255,
        b: data[i + 2] / 255,
        a: data[i + 3] / 255,
        index: i,
        width,
        height,
        x: ((i / 4) % width) / width,
        y: Math.floor(i / 4 / width) / height});

      data.set([r, g, b, a].map(v => Math.round(v * 255)), i);
    }
    return imageData;
  }