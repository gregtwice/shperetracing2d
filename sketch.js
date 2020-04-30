"use strict";


const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let circles = [];
let boxes = [];
setup();
window.requestAnimationFrame(loop);


document.addEventListener("keypress", (e) => {
    if (e.code === "KeyE") {
        angle += 0.01;
    }
    if (e.code === "KeyQ") {
        angle -= 0.01;
    }
});

let p = new Point(188, 321, ctx);


let mouseX;
let mouseY;

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

function setup() {

    circles.push(new Circle(400, 600, 80, ctx));
    circles.push(new Circle(900, 300, 120, ctx));
    circles.push(new Circle(1200, 500, 90, ctx));

    boxes.push(new Box(800, 100, 100, 150, ctx));
    boxes.push(new Box(800, 650, 200, 150, ctx));
    boxes.push(new Box(800, 100, 100, 150, ctx));
    document.body.onmousemove = ev => {
        let {x, y} = getMousePos(canvas, ev);
        mouseX = x;
        mouseY = y;
        // points = [];
    };

}

/**
 * Returns the distance between a point and a circle
 * @param p {Point}
 * @param c {Circle}
 */
function signedDstToCircle(p, c) {
    let x = c.x - p.x;
    let y = c.y - p.y;
    return length(x, y) - c.radius;
}

/**
 * Returns the distance between a box and a point
 * @param p {Point}
 * @param b {Box}
 */
function signedDstToBox(p, b) {
    let offX = Math.abs(p.x - b.x) - b.sx / 2;
    let offY = Math.abs(p.y - b.y) - b.sy / 2;
    let uDst = length(Math.max(offX, 0), Math.max(offY, 0));
    let dstInBoxX = Math.min(offX, 0);
    let dstInBoxY = Math.min(offY, 0);
    let dstInBox = Math.max(dstInBoxX, dstInBoxY);
    return uDst + dstInBox;

}

let points = [];
let angle = 0;

/**
 * Returns the minimal distance between all elements of the scene
 * @returns {number} the distance
 */
function distanceToScene() {
    let d = 500000;
    for (const box of boxes) {
        let dist = signedDstToBox(p, box);
        box.draw();
        d = Math.min(d, dist);
    }
    for (const circle of circles) {
        let dist = signedDstToCircle(p, circle);
        circle.fill();
        d = Math.min(d, dist);
    }
    return d;
}

/**
 * Main loop
 */
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const point of points) {
        point.draw();
    }
    p.update(mouseX, mouseY);
    let d = distanceToScene();


    let rd = new Point(Math.cos(angle), Math.sin(angle), ctx);

    // finding the intersection
    while (d > 1) {
        let dc = new Circle(p.x, p.y, d, ctx);
        dc.stroke();
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(rd.x * d, rd.y * d);

        ctx.stroke();
        ctx.fillRect(0, 0, 1, 1);
        ctx.restore();

// move the point to the safe distance
        p.update(p.x + rd.x * d, p.y + rd.y * d);
        // calculate the new distance
        d = distanceToScene();
        // if the point is out of bounds, break
        if (p.x > 2000 || p.y > 1100) break;
        if (p.x < 0 || p.y < 0) break;
    }

    angle += 0.001;
    // if the point can be rendered, add it to the render list
    if (p.x < 2000 && p.y < 1100)
        if (p.x > 0 && p.y > 0) {
            if (points.length <= 2000)
                points.push(Point.copy(p));
            else {
                points.shift();
                points.push(Point.copy(p))
            }
        }

    requestAnimationFrame(loop);
}

