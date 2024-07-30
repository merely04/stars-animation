const STARS_COUNT = 100;
const COLORS = [
	'rgba(198, 202, 222, 0.8)',
	'rgba(198, 202, 222, 0.95)',
]

const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

class Star {
    constructor(x, y, speed, size, angle, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.angle = angle;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.angle += (Math.random() - 0.5) * 0.1;  // Randomize the angle slightly
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Wrap the stars around the edges of the canvas
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
}

function createStars() {
    for (let i = 0; i < STARS_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 0.5;
        const size = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const color = Math.random() < 0.5 ? COLORS[0] : COLORS[1];
        stars.push(new Star(x, y, speed, size, angle, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    createStars();
});
