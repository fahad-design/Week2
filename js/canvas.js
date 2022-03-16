const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

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

document.getElementById("text").onkeyup = function(){
  const text = document.getElementById("text").value;
  drawTextOnCanvas(text, canvas, ctx);
}

function drawTextOnCanvas(text, canvas, ctx){
  ctx.font = "30px Arial"
  const x = document.getElementById("text1").value;
  const y = document.getElementById("text2").value;
  printAt(ctx, text, x, y, 10, 400)
}

function printAt(ctx, text, x, y, lineHeight, fitWidth) {
  if (fitWidth <= 0) {
    ctx.fillText(text, x, y);
    return;
  }
  for (var idx = 1; idx <= text.length; idx++) {
    var str = text.substr(0, idx);
    console.log(str, ctx.measureText(str).width, fitWidth);
    if (ctx.measureText(str).width >= fitWidth) {
      ctx.fillText(text.substr(0, idx - 1), x, y);
      printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
      return;
    }
  }
  ctx.fillText(text, x, y);
}

  $('input').keydown(function(e){
    if(e.keyCode==8){
      var newvalue = $(this).val();
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillText(newvalue, 0, 0);
    }
  });

document.getElementById("download").onclick = function(){
  const link = document.createElement("a");
  link.download = "image.png"
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
}
window.addEventListener("load", () => {
  const text = document.getElementById("text").value = "";
  const loadimg = document.getElementById("uploader").value = "";
  const x = document.getElementById("text1").value = "";
  const y = document.getElementById("text2").value = "";
});