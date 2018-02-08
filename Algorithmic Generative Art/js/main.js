var canvas = document.getElementById("mainCanvas");

//Accesses the 2D rendering context for our canvas
var ctx = canvas.getContext("2d");

var gui = new dat.GUI();


var width = canvas.width*2;
var height = canvas.height*2;


function Point(x,y,xS,yS){
    this.x = x;
    this.y = y;
    this.Xspeed = xS;
    this.Yspeed = yS;
}



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

// createLines();
// drawLines();

////////////////////////////////////
// drawing random lines
////////////////////////////////////




function initGUI() {
    drawingSetup = gui.addFolder('Drawing setup');
    colorSetup = gui.addFolder('Color setup');

    var mainSettings = {
        resetDrawing()
        {
            circlePoints = [];
            createCircle();
        }
    };
    drawingSetup.add(mainSettings,'resetDrawing');
    drawingSetup.add(guiEntries,'sections',10,100).listen();
    drawingSetup.add(guiEntries,'radius',10,1000).listen();
    drawingSetup.add(guiEntries,'noise',0.001,.1).listen();
    drawingSetup.add(guiEntries,'circleCount',1,1000).listen();

    colorSetup.add(guiEntries,'Red',0,255).listen();
    colorSetup.add(guiEntries,'Green',0,255).listen();
    colorSetup.add(guiEntries,'Blue',0,255).listen();
}


var guiEntries = new initSetup(25,250,0.005,1000,255,0,255);


function initSetup (sections,radius,noise,circleCount,r,g,b){
    this.sections = sections;
    this.radius = radius;
    this.noise = noise;
    this.circleCount = circleCount;
    this.Red = r;
    this.Green = g;
    this.Blue = b;

}
////////////////////////////////////
// drawing random circles
////////////////////////////////////
sections = 200;
//radius = 200;
noise = .005;
//circleCount = 1000;
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
    this.speed = getRandom(-guiEntries.noise,guiEntries.noise);
}


function animateCircle(points) {
    // control the number of circles
    while (circlePoints.length > guiEntries.circleCount){
        circlePoints.splice(0, 1);
    }
    // check if the number of sections has changed
    if (sections != guiEntries.sections) {
        console.log("sections!");
        circlePoints = [];
        createCircle();
    }



    newPoints = [];
    for (i = 0 ; i < points.length ; i++){
        var x = points[i].x + points[i].x*points[i].speed;
        var y = points[i].y + points[i].y*points[i].speed;
        p = new circlePoint(x,y);
        points[i].speed = getRandom(-guiEntries.noise,guiEntries.noise);
        newPoints.push(p);
    }
    circlePoints.push(newPoints);

}

function createCircle() {
    sections = guiEntries.sections;
    console.log(sections,guiEntries.sections);
    newPoints = [];
    step = Math.PI *2 / guiEntries.sections;
    for (i = 0; i < guiEntries.sections ; i++){
        var x = guiEntries.radius*Math.cos(step*i);
        var y = guiEntries.radius*Math.sin(step*i);
        p = new circlePoint(x,y);
        newPoints.push(p);
    }
    circlePoints.push(newPoints);
}


function drawCurve(points){
    //draw curves over an array of points
    ctx.beginPath();
    for (i=0; i < points.length-2 ; i ++){

        var mX = (points[i].x+points[i+1].x)/2 + center;
        var mY = (points[i].y+points[i+1].y)/2 + center;
        ctx.quadraticCurveTo(points[i].x+ center,points[i].y+center, mX, mY);
    }

    ctx.quadraticCurveTo(points[i+1].x + center,points[i+1].y + center, points[0].x + center,points[0].y + center);
    ctx.stroke();
}


function createGradient() {
    // creates a gradient based on a given set of values
    gradients = [];
    var size = circlePoints.length;
    for (i = 0 ; i < size ; i ++){
        var gradient=ctx.createLinearGradient(0,0,width/2,0);
        var redVal = i / size;

        var r = toInt(guiEntries.Red);
        var g = toInt(guiEntries.Green);
        var b = toInt(guiEntries.Blue);

        var gradColor = "rgb("+r + ","+g + ","+b + ")";
        gradient.addColorStop("0","black");
        gradient.addColorStop(redVal,gradColor);
        gradient.addColorStop("1.0","black");
        counter += tSpeed;
        if (counter < 2 || counter > 98){tSpeed *= -1;}
        gradients.push(gradient);
    }
}


function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyleStyle = 'rgba(255,255,255,.01)';

    createGradient();
    ctx.lineWidth=0.1;
    for (j = 1 ; j < circlePoints.length ; j++){
        //setup the color and stroke
        ctx.lineWidth=(j/(circlePoints.length*10));
        ctx.strokeStyle = gradients[j];
        // draws the curve
        drawCurve(circlePoints[j]);
    }
    // animate the points once everything is done
    animateCircle(circlePoints[circlePoints.length-1]);


    //Continuously calls draw() again until cancelled
    var aRequest = window.requestAnimationFrame(drawCircle);

}

createCircle();
drawCircle();
initGUI();



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

function toInt(n){ return Math.round(Number(n)); };
