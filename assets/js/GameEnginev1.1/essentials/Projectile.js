class Projectile {
    constructor(position, direction) {
        this.position = { ...position };
        this.direction = direction;
        this.speed = 8;

        this.width = 10;
        this.height = 10;
        this.active = true;

        this.el = document.createElement('div');

        Object.assign(this.el.style, {
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'yellow',
            borderRadius: '50%',
            zIndex: '9999'
        });

        document.body.appendChild(this.el);
    }

    update() {
        if (!this.active) return;

        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;

        this.el.style.left = this.position.x + 'px';
        this.el.style.top = this.position.y + 'px';

        if (
            this.position.x < 0 ||
            this.position.x > window.innerWidth ||
            this.position.y < 0 ||
            this.position.y > window.innerHeight
        ) {
            this.destroy();
        }
    }

    destroy() {
        if (!this.active) return;

        this.active = false;
        if (this.el) this.el.remove();
    }
}

export default Projectile;