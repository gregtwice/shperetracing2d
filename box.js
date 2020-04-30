class Box {

    x;
    y;
    sx;
    sy;
    ctx;


    constructor(x, y, sx, sy, ctx) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.ctx = ctx;
    }

    draw() {

        let {x, y, sx, sy, ctx} = this;
        let pss = ctx.fillStyle;
        ctx.fillStyle = "#080808";
        ctx.fillRect(x - sx / 2, y - sy / 2, sx, sy);
        ctx.fillStyle = pss;

    }
}