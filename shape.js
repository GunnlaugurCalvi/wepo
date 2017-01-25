class Shape {
    constructor(x, y, color, width) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
        this.width = width;
    }
    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
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
        this.points.push({x: x, y: y});
        this.endX = x;
        this.endY = y;
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        this.points.forEach(function(elem) {
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
        context.moveTo(this.endX, this.endY);
        context.lineTo(this.x, this.y);
        context.stroke();
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        context.fillStyle = this.color;
        context.arc(this.x, this.y, 50, 0, 2 * Math.PI, false);
        context.stroke();
    }
}

class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.endX, this.endY, this.x - this.endX, this.y - this.endY);
        context.stroke();
    }
}