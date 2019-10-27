let canvas;
let orbitCount = 9;
let fRate = 60;
let orbits = [];
let knots = [];

let RADIANS = 0;
let DELTA_RADIANS = 0.007;
let LOOP_ENABLED = true;
let BACKGR;

function setup() {
	init();
	populateCanvas();
}

function draw() { // main p5 loop

	for (var i = 0; i < orbits.length; i++) {

		orbits[i].updateCoordinates();
		orbits[i].draw();

		var x = orbits[i].getOrbitCoordinateX();

		for (var j = 0; j < orbits.length; j++) {
			var y = orbits[j].getOrbitCoordinateY();
			knots[i][j].draw(x, y);
		}
	}

	PHI += DELTA_RADIANS;

	if (PHI >= 2 * PI)
	{
		if (LOOP_ENABLED)
			populateCanvas();
		else
			noLoop();
	}
}

function init() {
	// create canvas
	BACKGR = color(30, 30, 30);
	canvas = createCanvas(windowWidth - 50, windowHeight - 50);
	canvas.parent('canvas-container');
	fill(BACKGR);

	// set settings
	document.getElementById('orbitCountInput').value = orbitCount;
	document.getElementById('frameRateInput').value = fRate;
	document.getElementById('orbitVelocityInput').value = DELTA_RADIANS;
	document.getElementById('loopInput').checked = LOOP_ENABLED;

	// add event listeners
	document.getElementById('applySettingsBtn').addEventListener('click', onApplySettingsClicked);
	document.getElementById('loopInput').onclick = onLoopInputCheckChanged;
}

function onApplySettingsClicked() {
	orbitCount = parseInt(document.getElementById('orbitCountInput').value);
	fRate = parseInt(document.getElementById('frameRateInput').value);
	DELTA_RADIANS = parseFloat(document.getElementById('orbitVelocityInput').value);

	populateCanvas();
}

function onLoopInputCheckChanged() {
	LOOP_ENABLED = this.checked;

	var loopInputText = document.getElementById('loopInputText');

	if (LOOP_ENABLED)
		loopInputText.innerText = "LOOP START ENABLED";
	else
		loopInputText.innerText = "LOOP START DISABLED";
}

function populateCanvas() {
	background(BACKGR);
	noLoop();

	orbits = [];
	knots = [];
	PHI = 0;
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
