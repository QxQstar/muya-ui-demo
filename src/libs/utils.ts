export function loadImg(src: string) {
    return new Promise<HTMLImageElement>((resove, reject) => {
        const img = new Image();
        img.onload = function() {
            resove(img);
        }
        img.onerror = function() {
            reject();
        }
        img.src = src
    })
}