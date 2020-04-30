"use strict";

class Circle {
    x;
    y;
    radius;
    ctx;

    constructor(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
    }

    fill() {
        let {x, y, radius, ctx} = this;
        ctx.save();
        ctx.fillStyle = "#090909";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    stroke() {
        let {x, y, radius, ctx} = this;
        ctx.save();
        ctx.strokeStyle = "#c5c5c5";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

}