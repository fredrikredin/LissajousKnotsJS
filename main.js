let cellCount = 8;
let orbits = [];
let phi = 0;
let delta_phi = 0.01;

function setup() {
    createCanvas(windowWidth, windowHeight);
    populateOrbits();
    noFill();
    strokeWeight(4);
}

function draw() // main p5 loop
{
    background(0);

    for (var i = 0; i < orbits.length; i++) {
        orbits[i].draw();
        x = orbits[i].getOrbitCoordinateX();

        for (var j = 0; j < orbits.length; j++) {
            y = orbits[j].getOrbitCoordinateY();
            ellipse(x, y, 15);
        }
    }

    phi += delta_phi;
    orbits.forEach(orbit => orbit.update(phi));
}

function populateOrbits() {
    cellSize = Math.min(windowWidth, windowHeight) / cellCount;

    for (var i = 1; i < cellCount; i++) {
        var c = getRandomColor();
        x = (i + 0.5) * cellSize;
        y = 0.5 * cellSize;
        r = (cellSize - 20) / 2;
        orbits.push(new LissajousOrbit(x, y, r, i, c));
    }
}

function getRandomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return color(r, g, b);
}