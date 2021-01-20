function drawRect(context: CanvasRenderingContext2D) {

    context.fillRect(10,10,100,100)
    context.clearRect(35,35, 50,50)
    context.strokeRect(45,45,30,30)
}

function line(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.moveTo(120,10)
    context.lineTo(200,10)
    context.stroke()
}

function drawTriangle(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.moveTo(120,20)
    context.lineTo(120, 110)
    context.lineTo(200,110)
    context.lineTo(120,20)
    context.fill()
}

function drawSmall(context: CanvasRenderingContext2D) {
    // 画圆脸
    context.beginPath()
    context.arc(310,110,100,0,2 * Math.PI)
    context.stroke()

    // 画刘海
    context.beginPath()
    context.moveTo(245,35)
    context.lineTo(288,55)
    context.lineTo(278,15)
    context.fill()

    context.beginPath()
    context.moveTo(278,15)
    context.lineTo(320,50)
    context.lineTo(316,10)
    context.fill()

    context.beginPath()
    context.moveTo(316,10)
    context.lineTo(364,54)
    context.lineTo(363,24)
    context.fill()

    // 画眉毛
    context.beginPath()
    context.moveTo(235,60)
    context.quadraticCurveTo(250,45,285,60)
    context.stroke()

    context.beginPath()
    context.moveTo(335,60)
    context.quadraticCurveTo(350,45,385,60)
    context.stroke()

    // 画眼睛

    context.beginPath()
    context.arc(265, 80,15,0,2*Math.PI)
    context.stroke()
    context.beginPath()
    context.arc(265,87,7,0, 2* Math.PI)
    context.fill()

    context.beginPath()
    context.arc(365, 80,15,0,2*Math.PI)
    context.stroke()
    context.beginPath()
    context.arc(365,87,7,0, 2* Math.PI)
    context.fill()

    // 画鼻子
    context.beginPath()
    context.moveTo(290,110)
    context.lineTo(310,125)
    context.lineTo(330,110)
    context.fill()

    // 画嘴巴
    context.beginPath()
    context.moveTo(340,180)
    context.quadraticCurveTo(330,190,310,180)
    context.moveTo(315,180)
    context.quadraticCurveTo(300,190,280,180)
    context.moveTo(280,180)
    context.quadraticCurveTo(300,170,315,180)
    context.moveTo(315,180)
    context.quadraticCurveTo(330,170,340,180)
    context.fill()
}

function drawGroup(ctx: CanvasRenderingContext2D) {
  for (var i=0;i<6;i++){
    for (var j=0;j<6;j++){
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                        Math.floor(255-42.5*j) + ')';
      ctx.arc(450.5+j*25,20.5+i*25,10,0,Math.PI*2,true);
      ctx.stroke();
    }
  }
}

let startW = 10

function linearGradient(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(600,20,320,20)
  ctx.beginPath()
  const linear = ctx.createLinearGradient(600,30,900,30)
  linear.addColorStop(0,'#fff')
  linear.addColorStop(1,'red')
  ctx.strokeStyle = linear

  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.moveTo(600,30)
  ctx.lineTo(600 + startW,30)
  ctx.stroke()

  if (startW >= 300) {
    startW = 10
  } else {
    startW += 10
  }

  requestAnimationFrame(() => linearGradient(ctx))
}

function radialGradient(ctx: CanvasRenderingContext2D) {
  // 创建渐变
  var radgrad = ctx.createRadialGradient(30,30,1,45,45,30);
  radgrad.addColorStop(0, 'red');
  radgrad.addColorStop(0.9, '#019F62');
  radgrad.addColorStop(1, 'rgba(12,34,56,0)');

  ctx.fillStyle = radgrad;
  ctx.fillRect(0,0,150,150);
}

function drawImg(ctx: CanvasRenderingContext2D) {
  const image = new Image(60, 45); // Using optional size for image
image.onload = function() {

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  ctx.drawImage(image, 10, 200);

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  ctx.drawImage(image, 10, 200, image.width, image.height);
}; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}

export function draw(canvas: HTMLCanvasElement) {

    const context = canvas.getContext('2d')!;

    drawRect(context)
    line(context)
    drawTriangle(context)
    drawSmall(context)
    drawGroup(context);
    linearGradient(context)
    radialGradient(context)
    drawImg(context)
}