const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

/* Upload Image */
const readinputfile = new FileReader();
const readinputimg = new Image();
const imgupload = (e) => {
  readinputfile.onload = () => {
    readinputimg.onload = () => {
      canvas.width = readinputimg.width;
      canvas.height = readinputimg.height;
      ctx.drawImage(readinputimg, 0, 0);
    }
    readinputimg.src = readinputfile.result;
  }
  readinputfile.readAsDataURL(e.target.files[0]);
}
const loadimg = document.getElementById("uploader");
loadimg.addEventListener("change", imgupload);

/* Header Text */
document.getElementById("header").onkeyup = function(){
  const header = document.getElementById("header").value;
  drawTextOnheader(header, canvas, ctx);
}

function drawTextOnheader(header, canvas, ctx){
  ctx.font = "20px Arial"
  const xh = document.getElementById("x-h").value;
  ctx.fillText(header, xh, 40)
}

/* Body Text */
document.getElementById("body").onkeyup = function(){
  const body = document.getElementById("body").value;
  drawTextOnCanvas(body, canvas, ctx);
}

function drawTextOnCanvas(body, canvas, ctx){
  ctx.font = "30px Arial"
  const xb = document.getElementById("x-b").value;
  ctx.fillText(body, xb, canvas.height/2)
}

/* Footer Text */
document.getElementById("footer").onkeyup = function(){
  const footer = document.getElementById("footer").value;
  drawTextOnfooter(footer, canvas, ctx);
}

function drawTextOnfooter(footer, canvas, ctx){
  ctx.font = "20px Arial"
  const xf = document.getElementById("x-f").value;
  ctx.fillText(footer, xf, canvas.height-30)
}

/* Delete Text */
$('input').keydown(function (e) {
  if (e.keyCode == 8) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText($(this).val(), 0, 0);
  }
});

/* Download Image */
document.getElementById("download").onclick = function(){
  const link = document.createElement("a");
  link.download = "image.png"
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
}

/* Clear Every Field on Reload */
window.addEventListener("load", () => {
  document.getElementById("header").value = "";
  document.getElementById("body").value = "";
  document.getElementById("footer").value = "";
  document.getElementById("uploader").value = "";
  document.getElementById("x-h").value = "";
  document.getElementById("x-b").value = "";
  document.getElementById("x-f").value = "";
});