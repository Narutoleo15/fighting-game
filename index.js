const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    }
});

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "orange",

    offset: {
        x: -50,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
};


decTimer()
animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            player.lastKey = "d"
            break;
        case "a":
            keys.a.pressed = true
            player.lastKey = "a"
            break;
        case "w":
            player.velocity.y = -15
            break;
        case " ":
            player.attack()
            break;

        case "ArrowRight":
            keys.ArrowRight.pressed = true
            enemy.lastKey = "ArrowRight"
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            enemy.lastKey = "ArrowLeft"
            break;
        case "ArrowUp":
            enemy.velocity.y = -15
            break;
        case "ArrowDown":
            enemy.isAttacking = true
            break;
    }
    console.log(event.key)
});


window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false
            break;
        case "a":
            keys.a.pressed = false
            break;
        case "w":
            keys.w.pressed = false
            break;
    }

    // enemy keys
    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break;
    }
    console.log(event.key);
});