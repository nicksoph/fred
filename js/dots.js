
function setSpiralData(numberOfDots) {
  // var phi = 0.381966;
  // var phiAngle = phi * 360;
  var phiAngle = 137.507764050037854
  var dotData = [];
  for (var i = 0; i <= numberOfDots; i++) {
    dotData[i] = {};
    var rotation = (phiAngle * i);
    if (rotation == 0) rotation = 0.000000001;
    dotData[i].length = Math.sqrt(rotation);
    dotData[i].angle = rotation % 360;
  };
  return dotData;
};

function setSpacing(spacing, dots) {
  for (var i = 0; i < dots.length; i++) {
    dots[i].length *= spacing
  };
  return dots;
}

function setDotSize(size, dots) {
  for (var i = 0; i < dots.length; i++) {
    dots[i].size = size;
  };
  return dots;
}

function setUfmColour(colour, dots) {
  for (var i = 0; i < dots.length; i++) {
    dots[i].ufmColour = colour;
  };
  return dots;
}

function setPicColour(dots) {
  var origin = new Point(view.center);
  for (var i = 0; i < dots.length; i++) {
    var dotCenter = new Point({
      length: dots[i].length,
      angle: dots[i].angle
    });
    var circ = new Path.Circle(origin + dotCenter, dots[i].size);
    dots[i].picColour = raster.getAverageColor(circ);
    dots[i].rndColour = dots[i].picColour
    circ.remove();
  };
  return dots;
}

function setRndColour(dots) {
  var rand;
  var temp;
  for (var i = 0; i < dots.length; i++) {
    rand = Math.floor(Math.random() * dots.length);
    temp = dots[i].rndColour;
    dots[i].rndColour = dots[rand].rndColour;
    dots[rand].rndColour = temp;
  };
  return dots;
}

function resetRandomColour(dots) {
  for (var i = 0; i < dots.length; i++) {
    dots[i].rndColour = dots[i].picColour;
  };
  return dots;
}

function drawDots(dots) {
  var origin = new Point(view.center);
  for (var i = 1; i < dots.length; i++) {
    var dotCenter = new Point({
      length: dots[i].length,
      angle: dots[i].angle
    });
    var circ = new Path.Circle(origin + dotCenter, dots[i].size);
    circ.fillColor = dots[i].rndColour
  };
  return;
}

function setAllDots() {
  var allDots = setSpiralData(2000);
  allDots = setSpacing(.7, allDots);
  allDots = setDotSize(6, allDots);
  allDots = setUfmColour("red", allDots);
  allDots = setPicColour(allDots);
  allDots = setRndColour(allDots);
  drawDots(allDots);
  return;
}

var canvas = document.getElementById('myCanvas');
var cWidth = canvas.width;
var cHeight = canvas.height;
var cBorder = new Rectangle(0, 0, cWidth, cHeight);
var raster = new Raster('mona', view.center);
raster.fitBounds(cBorder);
raster.position = view.center;

raster.visible = false;
setAllDots();


function onResize() {
  // if (raster.loaded)
  setAllDots();
  // text.point = view.bounds.bottomRight - [30, 30];
}


function onDocumentDrag(event) {
  event.preventDefault();
}

function onDocumentDrop(event) {
  event.preventDefault();

  var file = event.dataTransfer.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    var image = document.createElement('img');
    image.onload = function () {
      raster = new Raster(image, view.center);
      raster.fitBounds(cBorder);
      raster.position = view.center;
      raster.visible = false;

      setAllDots();
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);


