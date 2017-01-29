
class Shape {
    constructor(x, y, color, width, uText,Wtext,fontT) {
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
        this.text = uText;
        this.textW = Wtext;
        this.textFont = fontT;
    }
    setEnd(x, y) {
        this.p2.x = x;
        this.p2.y = y;
    }
    setWidth(width) {
        this.width = width;
    }
    updateContext(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;

    }
    drawPoint(context, p) {
        context.beginPath();
        context.arc(p.x, p.y, this.width/2, 0, 2*Math.PI);
        context.lineWidth = 0.1;
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
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
        this.updateContext(context);
        this.drawPoint(context, this.p1);
        
        context.beginPath();
        this.updateContext(context);

        this.points.forEach(function (elem) {
            context.lineTo(elem.x, elem.y);
        });
        context.stroke();

        this.drawPoint(context, this.p2);        
    }
}

class Line extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        this.updateContext(context);
        this.drawPoint(context, this.p1);

        context.beginPath();
        this.updateContext(context);
        context.moveTo(this.p2.x, this.p2.y);
        context.lineTo(this.p1.x, this.p1.y);
        context.stroke();

        this.drawPoint(context, this.p2);
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }
    draw(context) {
        this.updateContext(context);
        
        // TEKIÐ AF NETINU
        var radiusX = (this.p2.x - this.p1.x) * 0.5,
            radiusY = (this.p2.y - this.p1.y) * 0.5,
            centerX = this.p1.x + radiusX,
            centerY = this.p1.y + radiusY,
            step = 0.1,
            a = step,
            pi2 = Math.PI * 2 - step;

        context.beginPath();
        context.moveTo(centerX + radiusX * Math.cos(0), centerY + radiusY * Math.sin(0));

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
        this.updateContext(context);
        
        context.strokeRect(this.p2.x, this.p2.y, this.p1.x - this.p2.x, this.p1.y - this.p2.y);
        context.stroke();
    }
}

class Text extends Shape{

    constructor(x,y,color,width,text,textW,textFont){
        super(x,y,color,width,text,textW, textFont);
    }
    draw(context){
        context.strokeStyle = this.color;
        context.font = this.textW + ' ' + this.textFont;
        context.strokeText(this.text, this.p2.x, this.p2.y);
    };

}