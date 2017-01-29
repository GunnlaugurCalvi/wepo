function getMousePos(canvas, e) {
    var clientrect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - clientrect.left),
        y: (e.clientY - clientrect.top)
    };
}

$(document).ready(function () {
    var tool = document.getElementById("toolSelect");
    var Settings = {
        canvas: document.getElementById("whiteboard"),
        cShape: tool.options[tool.selectedIndex].value,
        color: document.getElementById('colorInput').value,
        width: 2,
        isDrawing: false,
        currentShape: undefined,
        shapes: [],
        redo: [],
        hasDrawn: false,
        userText: document.getElementById('userInputText').value,
        textWidth: $('#widthText').val(),
        fontText: $('#fontText').val()
    };

    savedPics();
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
    }
    function drawCurrentShape(e) {
        var p = getMousePos(Settings.canvas, e);
        shape.setEnd(p.x, p.y);
        shape.setWidth(Settings.width);
        shape.draw(context);
    }

    $("#undoButton").click( function() {
        if(Settings.shapes.length) {
            Settings.redo.push(Settings.shapes.pop());
            redrawCanvas();
        }
    });
    $("#redoButton").click( function() {
        if(Settings.redo.length) {        
            Settings.shapes.push(Settings.redo.pop());
            redrawCanvas();
        }
    });

    $("#savePaint").click(function () {
        saveP();
    });
    $("#loadPaint").click(function () {
        //TODO
    });
    $(Settings.canvas).mousedown(function (e) {
        Settings.cShape = tool.options[tool.selectedIndex].value;
        Settings.color = "#" + document.getElementById('colorInput').value;
        Settings.width = document.getElementById('widthInput').value;
        Settings.userText = document.getElementById('userInputText').value;
        Settings.textWidth = $('#widthText').val();
        Settings.fontText = $('#fontText').val();
        Settings.redo = [];

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
            shape = new Text(startp.x, startp.y, Settings.color, Settings.width, Settings.userText, Settings.textWidth,Settings.fontText);
        }

        redrawCanvas();
        drawCurrentShape(e);

    });

    $(Settings.canvas).mousemove(function (e) {
        if (Settings.isDrawing) {
            
            redrawCanvas();
            drawCurrentShape(e);
        }

    });

    function saveP() {
        var drawing = {
            title: document.getElementById('paintName').value,
            content: Settings.shapes
        };

        var url = "http://localhost:3000/api/drawings";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: JSON.stringify(drawing),
            success: function (data) {
                alert( drawing.title + ' is Saved!');
            },
            error: function (xhr, err) {
                alert('We came across this error ' +  xhr + err);
            }
        });


    }

    function savedPics() {
        var url = "http://localhost:3000/api/drawings";
        $.getJSON( url, function( data ) {
            $.each( data, function( key, val ) {
                $('#savedPaintings').append($('<option>', {
                    value: val.id,
                    text : val.title
                }));
            });
        });

    }
    function loadP() {
        var url = "http://localhost:3000/api/drawings/";
        //TODO
    }

    $(document).mouseup(function () {
        if(Settings.isDrawing) {
            Settings.shapes.push(shape);
            Settings.isDrawing = false;
            Settings.hasDrawn = false;
            console.log(Settings.shapes);
            redrawCanvas();
        }
    });
});