class Shape {
    constructor(x, y, color, width) {
        this.p1 = {
            x: x,
            y: y
        };
        this.p2 = {
            x: x,
            y: y
        };
        this.color = color;
        this.width = width;
    }
    setEnd(x, y) {
        this.p2.x = x;
        this.p2.y = y;
    }
    setWidth(width) {
        this.width = width;
    }
}

class Pen extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        this.points = [];
    }
    setEnd(x, y) {
        this.points.push({
            x: x,
            y: y
        });
        this.p2.x = x;
        this.p2.y = y;
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        this.points.forEach(function (elem) {
            context.lineTo(elem.x, elem.y);
        });
        context.stroke();
    }
}

class Line extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        context.moveTo(this.p2.x, this.p2.y);
        context.lineTo(this.p1.x, this.p1.y);
        context.stroke();
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;

        var radiusX = (this.p2.x - this.p1.x) * 0.5,
            radiusY = (this.p2.y - this.p1.y) * 0.5,
            centerX = this.p1.x + radiusX,
            centerY = this.p1.y + radiusY,
            step = 0.1,
            a = step,
            pi2 = Math.PI * 2 - step;

        context.beginPath();
        context.moveTo(centerX + radiusX * Math.cos(0), centerY + radiusY * Math.sin(0));

        /// create the ellipse    
        for (; a < pi2; a += step) {
            context.lineTo(centerX + radiusX * Math.cos(a), centerY + radiusY * Math.sin(a));
        }

        context.closePath();
        context.stroke();
    }
}

class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.p2.x, this.p2.y, this.p1.x - this.p2.x, this.p1.y - this.p2.y);
        context.stroke();
    }
}