class LissajousKnot
{
    constructor(color)
    {
        this.color = color;
        this.points = [];
    }

    draw(x, y, phi)
    {
        stroke(this.color);
        
        var p = { x: x, y: y };
        this.points.push(p)
        
        if (phi === 0)
            this.points = [];

        //this.points.forEach(p => point(p.x, p.y));
        // dont drae every point - for performance
        for (var i = 0; i < this.points.length; i++)
            if(i % 2 === 0)
                point(this.points[i].x, this.points[i].y)
        
        ellipse(p.x, p.y, 15);
    }
}