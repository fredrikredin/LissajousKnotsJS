class LissajousKnot
{
    constructor(x, y, color)
    {
        this.pos = { x: x, y: y };
        this.color = color;
    }

    draw()
    {
        stroke(this.color);
        ellipse(this.pos.x, this.pos.y, 15);
    }

    setCoordinates(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;
    }
}