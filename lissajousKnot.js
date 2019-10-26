class LissajousKnot
{
    constructor(color)
    {
        this.color = color;
    }

    draw(x, y)
    {
        stroke(this.color);
        strokeWeight(2);
        point(x, y);
    }
}