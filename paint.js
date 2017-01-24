function getMousePos(canvas, e) {
    var clientrect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - clientrect.left,
        y: e.clientY - clientrect.top
    };
}

$(document).ready(function () {
    var tool = document.getElementById("drawingTools")
    var Settings = {
        canvas: document.getElementById("whiteboard"),
        cShape: tool.options[tool.selectedIndex].value,
        color: "blue",
        isDrawing: false,
        currentShape: undefined,
        shapes: []
    }
    var context = Settings.canvas.getContext("2d");

    var startp = {
        x: 0,
        y: 0
    };

    $(Settings.canvas).mousedown(function (e) {
        var shape = undefined;
        Settings.cShape = tool.options[tool.selectedIndex].value;

        var p = getMousePos(Settings.canvas, e);
        startp = p;
        if (!Settings.isDrawing) {
            Settings.isDrawing = true;
        }

        if (Settings.cShape === "pen") {
            console.log("PEN");
        } else if (Settings.cShape === "line") {
            shape = Shape.Line(startp.x, startp.y, Settings.color);
        } else if (Settings.cShape === "rectangle") {
            shape = Shape.Rectangle(startp.x, startp.y, Settings.color);
        } else if (Settings.cShape === "circle") {
            shape = Shape.Circle(startp.x, startp.y, Settings.color);
        } else if (Settings.cShape === "text") {
            console.log("TEXT");
        }
        
        console.log(shape);
    });

    $(Settings.canvas).mousemove(function (e) {
        if (Settings.isDrawing === true) {
            var p = getMousePos(Settings.canvas, e);
            // DRAW PEN
            if (Settings.cShape === "pen") {
                // context.beginPath();
                // context.moveTo(startp.x, startp.y);
                // startp = p;
                // context.lineTo(p.x, p.y);
                // context.stroke();
            }
            // DRAW LINE 
            else if (Settings.cShape === "line") {
                // context.beginPath();
                // context.moveTo(startp.x, startp.y);
                // context.lineTo(p.x, p.y);
                // context.stroke();
            }
            // DRAW RECTANGLE
            else if (Settings.cShape === "rectangle") {
                // TODO: 
                context.fillStyle = "green";
                context.strokeRect(p.x, p.y, startp.x - p.x, startp.y - p.y);
            }
            // DRAW CIRCLE
            else if (Settings.cShape === "circle") {
                // TODO: 
                context.fillStyle = "red";
                context.strokeRect(p.x, p.y, startp.x - p.x, startp.y - p.y);
            }
            // DRAW TEXT
            else if (Settings.cShape === "text") {

            }
        }

    });

    $(Settings.canvas).mouseup(function (e) {
        Settings.isDrawing = false;
    })
});