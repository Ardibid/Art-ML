var canvas = document.getElementById("mainCanvas");

//Accesses the 2D rendering context for our canvas
var ctx = canvas.getContext("2d");


var pointNumbers    = 0;
var firstPose       = 0;
var colorFactor     = 0;
var colorRate       = 0;
var width = canvas.width*2;
var height = canvas.height*2;
var agents = [];
var gui;



// function setCanvasScalingFactor() {
//     return window.devicePixelRatio || 1;
// }


// function init() {
//     // to add
//     // GUI elements
//     console.log("add gui")
//
// }
//
//
// function resizeCanvas() {
//
//     //Gets the devicePixelRatio
//     var pixelRatio = setCanvasScalingFactor();
//
//     //The viewport is in portrait mode, so var width should be based off viewport WIDTH
//     if (window.innerHeight > window.innerWidth) {
//         //Makes the canvas 100% of the viewport width
//         var width = Math.round(1.0 * window.innerWidth);
//     }
//     //The viewport is in landscape mode, so var width should be based off viewport HEIGHT
//     else {
//         //Makes the canvas 100% of the viewport height
//         var width = Math.round(1.0 * window.innerHeight);
//     }
//
//     //This is done in order to maintain the 1:1 aspect ratio, adjust as needed
//     var height = width;
//
//     //This will be used to downscale the canvas element when devicePixelRatio > 1
//     aWrapper.style.width = width + "px";
//     aWrapper.style.height = height + "px";
//
//     canvas.width = width * pixelRatio;
//     canvas.height = height * pixelRatio;
// }





// function initValues(){
//     pointNumbers = 1000;
//     firstPose = 0;
//     colorFactor = 10;
//     colorRate = 1;
// }


function Point(x,y,xS,yS){
    this.x = x;
    this.y = y;
    this.Xspeed = xS;
    this.Yspeed = yS;
}

// function makeAgents() {
//     scatterRate = 1;
//     for (i = 0 ; i < pointNumbers ; i ++){
//         var agent = new Point(Math.random()*width*scatterRate,
//                                 Math.random()*height*scatterRate,
//                                 -1+ 2*Math.random(),
//                                 -1+ 2*Math.random());
//         agents.push(agent)
//     }
// }


// function drawAgents(){
//     //ctx.fillStyle = 'rgba(100,100,100,.01)';
//     //ctx.fillRect(0,0,width,height);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (i= 0; i < agents.length; i ++){
//         //draw a circle
//         ctx.fillStyle = 'rgba(222,222,222,.01)';
//         ctx.beginPath();
//         ctx.arc(agents[i].x, agents[i].y, 50, 0, 2*Math.PI);
//         ctx.stroke();
//         ctx.textAlign = 'center';
//         ctx.fillStyle = 'red';
//         var x = (Math.round(Number(agents[i].x)));
//
//         var y = (Math.round(Number(agents[i].y)));
//
//         var message = x+","+y;
//         //ctx.fillText(message, agents[i].x, agents[i].y);
//         //ctx.stroke();
//
//     }
//     animateAgents();
//     //Continuously calls draw() again until cancelled
//     var aRequest = window.requestAnimationFrame(drawAgents);
// }
//
// function animateAgents() {
//     for (i= 0; i < agents.length; i ++){
//         agents[i].x += agents[i].Xspeed;
//         agents[i].y += agents[i].Yspeed;
//         if (agents[i].x < 10 || agents[i].x > width-10){
//             agents[i].Xspeed *= -1;
//         }
//
//         if (agents[i].y < 10 || agents[i].y > height-10){
//             agents[i].Yspeed *= -1;
//         }
//     }
//
//
// }

//
// function draw() {
//
//     //Makes sure the canvas is clean at the beginning of a frame
//     //ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = 'rgba('+colorFactor+','+colorFactor+','+(255-colorFactor)+','+ (255-colorFactor)+')';
//     //ctx.fillRect(0,0,firstPose,firstPose);
//
//     //draw a circle
//     ctx.beginPath();
//     ctx.arc(0.1*firstPose, 1000-0.1*firstPose, 50, 0, 2*Math.PI, false);
//     ctx.closePath();
//     //ctx.fill();
//
//     xPos = [];
//     yPos = [];
//     xPos.push(0);
//     yPos.push(250);
//
//     for (var t = 0 ; t < canvas.width ; t ++){
//         yVal = yPos[0]+ Math.sin(t+firstPose)*10 +firstPose ;
//         xVal = t ;
//         xPos.push(xVal);
//         yPos.push(yVal);
//     }
//
//
//
//     var gradient=ctx.createLinearGradient(100,0,170,0);
//     gradient.addColorStop("0","magenta");
//     gradient.addColorStop("0.5","blue");
//     gradient.addColorStop("1.0","red");
//     //ctx.strokeStyle = gradient;
//     ctx.strokeStyle = 'red';//'rgba(128,128,128,.2)';
//
//     ctx.lineWidth=1;
//
//     ctx.moveTo(xPos[0], yPos[0]);
//     for (i=0; i < xPos.length - 2 ; i ++){
//         var mX = (xPos[i]+xPos[i+1])/2;
//         var mY = (yPos[i]+yPos[i+1])/2;
//         ctx.quadraticCurveTo(xPos[i], yPos[i], mX, mY);
//     }
//     ctx.stroke();
//
//
//     // animation values
//     firstPose = firstPose + 1;
//     colorFactor += colorRate;
//     if (colorFactor > 250 || colorFactor < 5){
//         colorRate *= -1;
//     }
//
//     //Continuously calls draw() again until cancelled
//     var aRequest = window.requestAnimationFrame(draw);
// }


////////////////////////////////////
// drawing random things
////////////////////////////////////

points = [];
yStart = 250;
simplify = 1;
function makePoints(){
    var pSize = canvas.width/simplify;

    firstPoint = new Point(0,250,0,0);
    points.push(firstPoint);

    for (i = 1 ; i < pSize ; i ++){
        x = i*simplify;
        y = points[i-1].y + Math.random();
        var noiseVal = noise.perlin2(x, y) ;
        point = new Point(x,y,0,noiseVal);
        points.push(point);
    }
}

function animatePoints() {
    for (i= 0; i < points.length; i ++){
        var noiseVal = noise.perlin2(points[i].x, points[i].y) ;
        points[i].y += points[i].Yspeed;
        points[i].Yspeed += noiseVal*1;
    }


}

function drawPoints(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyleStyle = 'rgba(255,255,255,.01)';
    animatePoints();

    var gradient=ctx.createLinearGradient(0,0,width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    ctx.strokeStyle = gradient;

    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, yStart);
    for (i=0; i < points.length - 2 ; i ++){
        var mX = (points[i].x+points[i+1].x)/2;
        var mY = (points[i].y+points[i+1].y)/2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, mX, mY);
    }
    ctx.stroke();


    //Continuously calls draw() again until cancelled
    var aRequest = window.requestAnimationFrame(drawPoints);
}


//makePoints();
//drawPoints();

////////////////////////////////////
// drawing random things
////////////////////////////////////


////////////////////////////////////
// drawing random lines
////////////////////////////////////

lineNumber = 100;
segmentNumber = 100;
lines = []
function theLine(xS,yS,xE,yE){
    this.xS = xS;
    this.yS = yS;
    this.xE = xE;
    this.yE = yE;
    this.segments=[];
}

function simplePoint(x,y){
    this.x = x;
    this.y = y;
}

function createNewLine(i){
    var dist = canvas.width/lineNumber;
    var rand = getRandom(0.2,.8);
    var l = rand*canvas.height;
    var margin = (canvas.height-l)/2;
    var totalLength =  canvas.height-2*margin;
    var segmentLen = totalLength/ segmentNumber;
    var line = new theLine (i*dist,margin,i*dist,canvas.height-margin);
    for (j = 0; j < segmentNumber ; j++){
        newPoint = new simplePoint(line.xS, line.yS+ j*segmentLen);
        line.segments.push(newPoint);
    }
    return line;
}


function createLines(){
    for (var i =0; i < lineNumber ; i ++){
        var line = createNewLine(i);
        lines.push(line);
        //lineNumber += 1;
    }
}

function animateLines(dist) {
    //var dist = canvas.width/lineNumber;
    var newDist = dist;
    var line = createNewLine(0);
    if (lines[lines.length - 1].xE > canvas.width){
        lines.pop();
    }

    lines.unshift(line);
    for (var i =0; i < lines.length ; i ++){

        lines[i].xS += newDist;
        lines[i].xE += newDist;
        for (var j =0; j < segmentNumber ; j ++){
            lines[i].segments[j].x += newDist;
        }
    }
}

function  drawLines() {
    dist = canvas.width/lineNumber;
    animateLines(dist);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyleStyle = 'rgba(255,255,255,.01)';

    var gradient=ctx.createLinearGradient(0,0,width/2,0);
    gradient.addColorStop("0","black");
    gradient.addColorStop("0.5","red");
    gradient.addColorStop("1.0","black");
    ctx.strokeStyle = gradient;
    ctx.lineWidth=.2;

    for (j=0; j < lines[0].segments.length -1 ; j ++) {
    //j = 10;
        ctx.beginPath();
        ctx.moveTo(lines[0].segments[j].x, lines[0].segments[j].y);
        for (i=0; i < lines.length-1 ; i ++){
            //ctx.moveTo(lines[i].segments[j].x, lines[i].segments[j].y);
            //ctx.lineTo(lines[i+1].segments[j].x, lines[i+1].segments[j].y);

            var mX = (lines[i].segments[j].x+lines[i+1].segments[j].x)/2;
            var mY = (lines[i].segments[j].y+lines[i+1].segments[j].y)/2;
            ctx.quadraticCurveTo(lines[i].segments[j].x, lines[i].segments[j].y, mX, mY);
        }
        ctx.stroke();

    }
    //Continuously calls draw() again until cancelled
    var aRequest = window.requestAnimationFrame(drawLines);

}

//createLines();
//drawLines();

////////////////////////////////////
// drawing random lines
////////////////////////////////////


////////////////////////////////////
// drawing random circles
////////////////////////////////////
sections = 200;
radius = 200;
noise = .005;
circleCount = 1000;
center = canvas.width/2;
circlePoints = [];
gradients = [];
counter = 5;
tSpeed = 1;

var circles = function(r, sections){
    this.r = r;
    this.sections = sections;
}

function circlePoint(x,y){
    this.x = x;
    this.y = y;
    this.speed = getRandom(-noise,noise);
}

// simple animation
// function animateCircle(points) {
//     for (i = 0 ; i < points.length ; i++){
//         points[i].x += points[i].x*points[i].speed;
//         points[i].y += points[i].y*points[i].speed;
//         points[i].speed = getRandom(-.1,.1);
//     }
//
// }

function animateCircle(points) {
    if (circlePoints.length > circleCount){
        circlePoints.splice(0, 1);
    }
    newPoints = [];
    for (i = 0 ; i < points.length ; i++){
        var x = points[i].x + points[i].x*points[i].speed;
        var y = points[i].y + points[i].y*points[i].speed;
        p = new circlePoint(x,y);
        points[i].speed = getRandom(-noise,noise);
        newPoints.push(p);
    }
    circlePoints.push(newPoints);

}

function createCircle() {
    newPoints = [];
    step = Math.PI *2 / sections;
    for (i = 0; i < sections ; i++){
        var x = radius*Math.cos(step*i);
        var y = radius*Math.sin(step*i);
        p = new circlePoint(x,y);
        newPoints.push(p);
    }
    circlePoints.push(newPoints);
}


function drawCurve(points){
    //j = 10;
    ctx.beginPath();
    for (i=0; i < points.length-1 ; i ++){
        var mX = (points[i].x+points[i+1].x)/2 + center;
        var mY = (points[i].y+points[i+1].y)/2 + center;
        ctx.quadraticCurveTo(points[i].x+ center,points[i].y+center, mX, mY);
    }
    var mX = (points[points.length-1].x+points[0].x)/2 + center;
    var mY = (points[points.length-1].y+points[0].y)/2 + center;
    ctx.quadraticCurveTo(points[points.length-1].x + center,points[points.length-1].y+ center, mX, mY);

    var mX = (points[0].x+points[1].x)/2 + center;
    var mY = (points[0].y+points[1].y)/2 + center;
    ctx.quadraticCurveTo(points[0].x+ center ,points[0].y + center, mX, mY);
    ctx.stroke();
}

function animateGradient(){
    var gradient=ctx.createLinearGradient(0,0,width/2,0);
    var redVal = counter / 100;
    gradient.addColorStop("0","black");
    gradient.addColorStop(redVal,"red");
    gradient.addColorStop("1.0","black");
    counter += tSpeed;
    if (counter < 2 || counter > 98){tSpeed *= -1;}
    return gradient;
}

function createGradient() {
    var size = circlePoints.length;
    for (i = 0 ; i < size ; i ++){
        var gradient=ctx.createLinearGradient(0,0,width/2,0);
        var redVal = counter / 100;
        gradient.addColorStop("0","black");
        gradient.addColorStop(redVal,"red");
        gradient.addColorStop("1.0","black");
        counter += tSpeed;
        if (counter < 2 || counter > 98){tSpeed *= -1;}
        gradients.push(gradient);
    }
}


function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyleStyle = 'rgba(255,255,255,.01)';
    //var gradient = animateGradient();
    //ctx.strokeStyle = gradient;
    createGradient();
    ctx.lineWidth=0.1;
    for (j = 1 ; j < circlePoints.length ; j++){
        ctx.lineWidth=(j/(circlePoints.length*5));
        ctx.strokeStyle = gradients[j];
        drawCurve(circlePoints[j]);
    }
    //if (circlePoints.length < 100){
        animateCircle(circlePoints[circlePoints.length-1]);
    //}

    //Continuously calls draw() again until cancelled
    var aRequest = window.requestAnimationFrame(drawCircle);

}

createCircle();
drawCircle();







////////////////////////////////////
// end of drawing random circles
////////////////////////////////////

//window.addEventListener("resize", resizeCanvas, false);

//resizeCanvas();
//initValues();
//init();
//draw();
//makeAgents();
//drawAgents();


////////////////////////////////////
// Helper functions
////////////////////////////////////
function getRandom(min, max) {
    return (Math.random() * (max - min) ) + min;
}

var link = document.createElement('a');
link.innerHTML = 'download image';
link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}, false);
document.body.appendChild(link);
