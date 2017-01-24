class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
    }
    setEnd(x,y) {
        this.endX = x;
        this.endY = y;
    }

}

class Line extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        this.points = [];
    }
    setEnd(x, y) {
        this.points.push({x: x, y: y});
    }
    draw(context) {
        context.fillStyle = this.color;
        this.points.forEach(function(elem) {
            context.fillRect(elem.x, elem.y, 1, 1);
        });
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        context.fillStyle = this.color;
        var absX = Math.abs(this.x-this.endX);
        var absY = Math.abs(this.y-this.endY);
        context.scale(absX, absY);
        context.arc(absX, absY, radius, 0, 2 * Math.PI, false);
    }
}

class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.endX, this.endY);
    }
}