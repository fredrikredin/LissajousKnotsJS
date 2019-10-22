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

        // draw upper row orbit
        ellipse(this.pos.x, this.pos.y, 2 * this.radius);
        ellipse(this.getOrbitCoordinateX(), this.pos.y + this.orbit.y, 15);
        
        // draw left column orbit
        ellipse(this.pos.y, this.pos.x, 2 * this.radius);
        ellipse(this.pos.y + this.orbit.x, this.getOrbitCoordinateY(), 15);
    }

    update(phi)
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