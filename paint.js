function getMousePos(canvas, e) {
    var clientrect = canvas.getBoundingClientRect();
    return {
        x: ~~(e.clientX - clientrect.left),
        y: ~~(e.clientY - clientrect.top)
    };
}

$(document).ready(function () {
    var tool = document.getElementById("drawingTools")
    var Settings = {
        canvas: document.getElementById("whiteboard"),
        cShape: tool.options[tool.selectedIndex].value,
        color: "blue",
        width: 1,
        isDrawing: false,
        currentShape: undefined,
        shapes: []

    }
    var shape = undefined;
    var context = Settings.canvas.getContext("2d");

    var startp = {
        x: 0,
        y: 0
    };

    $(Settings.canvas).mousedown(function (e) {
        Settings.cShape = tool.options[tool.selectedIndex].value;

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
        if (Settings.isDrawing === true) {
            context.beginPath();
            context.clearRect(0, 0, Settings.canvas.width, Settings.canvas.height);
            context.stroke();
            Settings.shapes.forEach(function(elem) {
                elem.draw(context);
            });

            var p = getMousePos(Settings.canvas, e);
            shape.setEnd(p.x, p.y);
            shape.setWidth(2);
            shape.draw(context);
        }

    });

    $(Settings.canvas).mouseup(function (e) {
        Settings.isDrawing = false;
        Settings.shapes.push(shape);
        console.log(Settings.shapes);

    })
});