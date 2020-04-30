"use strict";

class Point {

    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "#FFF";
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.restore();
    }

    /**
     *
     * @param p {Point}
     * @returns {Point}
     */
    static copy(p){
        return new Point(p.x,p.y,p.ctx);
    }
}