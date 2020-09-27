var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle = 'rgba(255, 0 ,0 , 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255, 0 ,123 , 0.5)';
// c.fillRect(200, 200, 100, 100);
// c.fillRect(300, 100, 100, 100);
// c.fillStyle = 'rgb(0, 255, 0)';
// c.fillRect(723, 145, 200, 200);

// // lines

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = 'blue';
// c.stroke();

// c.beginPath();
// c.moveTo(100, 100);
// c.lineTo(250, 500);
// c.strokeStyle = 'red';
// c.stroke();

// for (let i = 0; i < 33; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
//     console.log(randomColor);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = randomColor;
//     c.stroke();   
// }

var mouse = {};
var maxRadius = 40;
var colors = [
    '#E2FFFF',
    '#08AFB8',
    '#36B39D',
    '#3E4142',
    '#0ABF46'
]


function randomRgba() {
    return Math.floor(Math.random() * 256);
}


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
        // c.fillStyle = `rgba(${randomRgba()}, ${randomRgba()}, ${randomRgba()}, ${Math.random()})`;
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