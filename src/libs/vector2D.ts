export default class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector2D(this.x, this.y)
    }

    add(v: Vector2D) {
        this.x += v.x;
        this.y += v.y;
        
        return this;
    }

    sub(v: Vector2D) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    length() {
        return Math.hypot(this.x, this.y)
    }

    dir() {
        return Math.atan2(this.y, this.x)
    }

    rotate(rad: number) { 
        const c = Math.cos(rad), s = Math.sin(rad);
        const {x, y} = this; 
        this.x = x * c + y * -s; 
        this.y = x * s + y * c; 
        return this; 
    }

    scale(length: number) {
        const rad = this.dir()
        this.x = Math.cos(rad) * length
        this.y = Math.sin(rad) * length

        return this;
    }
}