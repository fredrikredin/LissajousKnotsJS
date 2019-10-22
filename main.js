let orbitCount = 5;
let orbits = [];
let knots = [];
let phi = 0;
let delta_phi = 0.02;

function setup() {
    frameRate(20);
    createCanvas(windowWidth, windowHeight);
    
    populateOrbits();
    populateKnots();

    noFill();
    strokeWeight(2);
}

function draw() // main p5 loop
{
    background(0);

    for (var i = 0; i < orbits.length; i++) {

        orbits[i].draw();

        var x = orbits[i].getOrbitCoordinateX();
        
        for (var j = 0; j < orbits.length; j++) {
            var y = orbits[j].getOrbitCoordinateY();
            knots[i][j].draw(x, y, phi);
        }
    }

    phi += delta_phi;

    if (phi >= 2 * PI)
        phi = 0;

    orbits.forEach(orbit => orbit.update(phi));
}

function populateOrbits() {
    cellSize = Math.min(windowWidth, windowHeight) / (orbitCount + 1);

    for (var i = 1; i <= orbitCount; i++) {
        var c = getRandomColor();
        var x = (i + 0.5) * cellSize;
        var y = 0.5 * cellSize;
        var r = (cellSize - 30) / 2;
        orbits.push(new LissajousOrbit(x, y, r, i, c));
    }
}

function populateKnots() {

    for (var i = 0; i < orbits.length; i++) {
        var k = [];

        for (var j = 0; j < orbits.length; j++) {
            var c = getMixedColor(orbits[i].color, orbits[j].color);
            k.push(new LissajousKnot(c));
        }

        knots.push(k);
    }
}

function getRandomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return color(r, g, b);
}

function getMixedColor(c1, c2)
{
    var r = 0.5 * c1._getRed()   + 0.5 * c2._getRed();
    var g = 0.5 * c1._getGreen() + 0.5 * c2._getGreen();
    var b = 0.5 * c1._getBlue()  + 0.5 * c2._getBlue();
    return color(r, g, b);
}