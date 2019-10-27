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
        strokeWeight(2);

        // row ellipse
        ellipse(this.pos.x, this.pos.y, 2 * this.radius); 
        // col ellipse
        ellipse(this.pos.y, this.pos.x, 2 * this.radius); 
        
        stroke(BACKGR);
        strokeWeight(3);
        
        // row arc
        arc(this.pos.x, this.pos.y, 
            2 * this.radius, 2 * this.radius, 
            PHI * this.velocity, 
            PHI * this.velocity + 0.3);

        // col arc
        arc(this.pos.y, this.pos.x, 
            2 * this.radius, 2 * this.radius, 
            PHI * this.velocity, 
            PHI * this.velocity + 0.3);
    }

    updateCoordinates()
    {
        this.orbit.x = this.radius * cos(PHI * this.velocity);
        this.orbit.y = this.radius * sin(PHI * this.velocity);
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