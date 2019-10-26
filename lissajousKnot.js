class LissajousKnot
{
    constructor(color)
    {
        this.color = color;
    }

    draw(x, y, phi)
    {
        stroke(this.color);
        strokeWeight(4);
        point(x, y);
    }
}