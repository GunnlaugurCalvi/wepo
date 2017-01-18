$(document).ready(function(){
    var canvas = document.getElementById("whiteboard");
    var context = canvas.getContext("2d");
    var startX = 0;
    var startY = 0;
    var isDrawing = false;

    $("#whiteboard").mousedown(function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        startX = x;
        startY = y;
        isDrawing = true;

        // console.log("X: "+  x+ "Y:" + y);
        // context.fillStyle = "green";
        // context.fillRect(x-30,y-30,60,60);
        // context.strokeRect(x-30,y-30,60,60);

    });
    $("whiteboard").mouse
    $("#whiteboard").mousemove(function (e) {
        if(isDrawing === true){
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            context.beginPath();
            context.moveTo(100,100);
            context.lineTo(100,120);
            context.lineTo(120,120);
            context.lineTo(120,140);
            context.lineTo(100,140);
            context.lineTo(100,160);
            context.lineTo(80,160);
            context.lineTo(80,140);
            context.lineTo(60,140);
            context.lineTo(60,120);
            context.lineTo(80,120);
            context.lineTo(80,100);
            context.lineTo(100,100);
            context.stroke();
            // context.beginPath();
            // context.moveTo(startX,startY);
            // context.lineTo(x,y);
            // context.stroke();
        }

    });

    $("#whiteboard").mouseup(function (e) {
        isDrawing = false;
    })
});