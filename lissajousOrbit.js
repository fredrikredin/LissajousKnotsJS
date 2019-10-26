class LissajousOrbit
{
    constructor(x, y, radius, velocity, color)
    {
        this.pos = { x: x, y: y };
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.orbit = { x: 0, y: 0 };
    }

    draw()
    {
        stroke(this.color);
        fill(backgr);
        strokeWeight(5);
        
        ellipse(this.pos.x, this.pos.y, 2 * this.radius); // row

        ellipse(this.pos.y, this.pos.x, 2 * this.radius); // col
        
        strokeWeight(1);
        
        ellipse(this.getOrbitCoordinateX(), this.pos.y + this.orbit.y, 5); // row
        
        ellipse(this.pos.y + this.orbit.x, this.getOrbitCoordinateY(), 5); // column
        
    }

    updateCoordinates(phi)
    {
        this.orbit.x = this.radius * cos(phi * this.velocity);
        this.orbit.y = this.radius * sin(phi * this.velocity);
    }

    getOrbitCoordinateX()
    {
        return this.pos.x + this.orbit.x;
    }

    getOrbitCoordinateY()
    {
        return this.pos.x + this.orbit.y;
    }
}