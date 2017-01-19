function getMousePos(canvas, e) {
    var clientrect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - clientrect.left,
        y: e.clientY - clientrect.top
    };
}

$(document).ready(function () {
    var canvas = document.getElementById("whiteboard");
    var context = canvas.getContext("2d");
    var tool = document.getElementById("drawingTools")
    var startX = 0;
    var startY = 0;
    var isDrawing = false;
    

    $(canvas).mousedown(function (e) {
        var p = getMousePos(canvas, e);
        var x = p.x;
        var y = p.y;

        startX = x;
        startY = y;
        isDrawing = true;
        
    });

    $(canvas).mousemove(function (e) {
        if (isDrawing === true) {
            var p = getMousePos(canvas, e);
            var x = p.x;
            var y = p.y;
            // DRAW PEN
            if (tool.options[tool.selectedIndex].value === "pen") {
                // TODO: implement pen
            }
            // DRAW LINE 
            else if (tool.options[tool.selectedIndex].value === "line") {
                // TODO: 
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(x, y);
                context.stroke();
            } 
            // DRAW RECTANGLE
            else if (tool.options[tool.selectedIndex].value === "rectangle") {
                // TODO: 
                console.log("X: " + x + "Y:" + y);
                context.fillStyle = "green";
                context.strokeRect(x, y, startX-x, startY-y);
            }
            // DRAW CIRCLE
            else if (tool.options[tool.selectedIndex].value === "circle") {
                // TODO: 
                console.log("X: " + x + "Y:" + y);
                context.fillStyle = "red";
                context.strokeRect(x, y, startX-x, startY-y);
            } 
            // DRAW TEXT
            else if(tool.options[tool.selectedIndex.value] === "text") {
                
            }
        }

    });

    $(canvas).mouseup(function (e) {
        isDrawing = false;
    })
});