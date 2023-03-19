export default function getBase64Image(imgUrl, callback) {
  var img = new Image();

  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
  };

  img.setAttribute("crossOrigin", "anonymous");
  img.src = imgUrl;
}
