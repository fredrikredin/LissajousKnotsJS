let canvas;
let orbitCount = 6;
let fRate = 60;
let orbits = [];
let knots = [];
let phi = 0;
let delta_phi = 0.01;
let backgr;

function setup() {
	init();
	populateCanvas();
}

function draw() { // main p5 loop

	for (var i = 0; i < orbits.length; i++) {

		orbits[i].updateCoordinates(phi);
		orbits[i].draw();
		
		var x = orbits[i].getOrbitCoordinateX();
		
		for (var j = 0; j < orbits.length; j++) {
			var y = orbits[j].getOrbitCoordinateY();
			knots[i][j].draw(x, y, phi);
		}
	}
	
	phi += delta_phi;
	
	if (phi >= 2 * PI)
		populateCanvas();
}

function init() {
	// create canvas
	backgr = color(30, 30, 30);
	canvas = createCanvas(windowWidth - 50, windowHeight - 50);
	canvas.parent('canvas-container');
	
	// set settings
	document.getElementById('orbitCountInput').value = orbitCount;
    document.getElementById('frameRateInput').value = fRate;
    document.getElementById('orbitVelocityInput').value = delta_phi;

	// add event listeners
	document.getElementById('applySettingsBtn').addEventListener('click', onApplySettingsClicked);
}

function onApplySettingsClicked() {
	orbitCount = parseInt(document.getElementById('orbitCountInput').value);
    fRate = parseInt(document.getElementById('frameRateInput').value);
    delta_phi = parseFloat(document.getElementById('orbitVelocityInput').value);

	populateCanvas();
}

function populateCanvas() {
	background(backgr);
    noLoop();

	orbits = [];
	knots = [];
    phi = 0;
	frameRate(fRate);

	populateOrbits();
    populateKnots();
    
	loop();
}

function populateOrbits() {
	cellSize = Math.min(canvas.width, canvas.height) / (orbitCount + 1);

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
	var g = (num >> 8) & 255;
	var b = num & 255;
	return color(r, g, b);
}

function getMixedColor(c1, c2) {
	var r = 0.5 * c1._getRed() + 0.5 * c2._getRed();
	var g = 0.5 * c1._getGreen() + 0.5 * c2._getGreen();
	var b = 0.5 * c1._getBlue() + 0.5 * c2._getBlue();
	return color(r, g, b);
}