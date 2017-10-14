// raster.on('load', function () {
//   setTimeout(raster.fitBounds(cBorder), 50);
// });
raster.fitBounds(cBorder)

// raster.onload = function () {
//   raster.fitBounds(view.bounds)
// };


// function resizeAll() {
//   //size it
//   raster.scale(1);
//   //later an event like window resize occours, so scale the image up
//   raster.scale(1);
//   // raster.scale(2 / raster.bounds.height);
//   raster.setHeight(raster.height + 1); raster.setHeight(raster.height - 1);
// };

// var raster = new Raster('mona', view.center);
// zylinder.on('load', function () {
//   //size it
//   zylinder.scale(800 / zylinder.bounds.height);
//   //later an event like window resize occours, so scale the image up
//   zylinder.scale(800 / zylinder.bounds.height);
// })

// var raster = new Raster('mona', view.center);
// raster.fitBounds(raster.Bounds);
raster.position = view.center;
raster.visible = false;
// raster.rotate(45);
console.log(raster);
console.log(myCanvas);
//setTimeout(function () { drawAll(); }, 50);
console.log('drawing');
drawAll()

//setTimeout(function () { drawAll(); }, 1000);
// if (raster) {
// drawAll();
// }
// var width = myCanvas.width;
// var height = myCanvas.height;
// console.log(width);

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);

