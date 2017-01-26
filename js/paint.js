function getMousePos(canvas, e) {
    var clientrect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - clientrect.left),
        y: (e.clientY - clientrect.top)
    };
}

$(document).ready(function () {
    var tool = document.getElementById("toolSelect");
    var colorS = document.getElementById("colorSelect");
    var Settings = {
        canvas: document.getElementById("whiteboard"),
        cShape: tool.options[tool.selectedIndex].value,
        color: colorS.options[colorS.selectedIndex].value,
        width: 2,
        isDrawing: false,
        currentShape: undefined,
        shapes: [],
        redo: [],
        hasDrawn: false
    }

    var shape = undefined;
    var context = Settings.canvas.getContext("2d");
    var startp = {
        x: 0,
        y: 0
    };

    function redrawCanvas() {
        context.beginPath();
        context.clearRect(0, 0, Settings.canvas.width, Settings.canvas.height);
        Settings.shapes.forEach(function (elem) {
            elem.draw(context);
        });
        context.stroke();
    };

    $("#undoButton").click( function() {
        Settings.redo.push(Settings.shapes.pop());
        redrawCanvas();
    });
    $("#redoButton").click( function() {
        Settings.shapes.push(Settings.redo.pop());
        redrawCanvas();
    });

    $(Settings.canvas).mousedown(function (e) {
        Settings.cShape = tool.options[tool.selectedIndex].value;
        Settings.color = colorS.options[colorS.selectedIndex].value;
        Settings.width = document.getElementById('widthInput').value;

        var p = getMousePos(Settings.canvas, e);
        startp = p;
        if (!Settings.isDrawing) {
            Settings.isDrawing = true;
        }

        if (Settings.cShape === "pen") {
            shape = new Pen(startp.x, startp.y, Settings.color, Settings.width);
        } else if (Settings.cShape === "line") {
            shape = new Line(startp.x, startp.y, Settings.color, Settings.width);
        } else if (Settings.cShape === "rectangle") {
            shape = new Rectangle(startp.x, startp.y, Settings.color, Settings.width);
        } else if (Settings.cShape === "circle") {
            shape = new Circle(startp.x, startp.y, Settings.color, Settings.width);
        } else if (Settings.cShape === "text") {
            console.log("TEXT");
        }

    });

    $(Settings.canvas).mousemove(function (e) {
        if (Settings.isDrawing) {
            Settings.hasDrawn = true;
            redrawCanvas();

            var p = getMousePos(Settings.canvas, e);
            shape.setEnd(p.x, p.y);
            shape.setWidth(Settings.width);
            shape.draw(context);

        }
    });

    $(document).mouseup(function (e) {
        if (Settings.hasDrawn)
            Settings.shapes.push(shape);
        Settings.isDrawing = false;
        Settings.hasDrawn = false;
        console.log(Settings.shapes);

    });
});