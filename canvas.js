var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {};
var maxRadius = 40;
var colors = [
    '#E2FFFF',
    '#08AFB8',
    '#36B39D',
    '#3E4142',
    '#0ABF46'
];

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius) {
            this.radius += 1;
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

}


var circles = [];

function init() {
    circles = [];
    for (let i = 0; i < 500; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        var y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circles.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circles.forEach(circle => circle.update());
}

init();
animate();