function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update()
    player.update();
    enemy.update();


    player.velocity.x = 0
    // player movement
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5
    };

    enemy.velocity.x = 0
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5
    };

    // detect for collision
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false;
        enemy.health -= 20
        document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    };
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false;
        player.health -= 20
        document.querySelector("#playerHealth").style.width = player.health + "%"
    };
    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
};

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = "flex"
    if (player.health === enemy.health) {
        document.querySelector("#displayText").innerHTML = "Tie"
    } else if (player.health > enemy.health) {
        document.querySelector("#displayText").innerHTML = "Player 1 Wins!"
    } else if (enemy.health > player.health) {
        document.querySelector("#displayText").innerHTML = "Player 2 Wins!"
    }
}

let timer = 60
let timerId
function decTimer() {
    if (timer > 0) {
        timerId = setTimeout(decTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId })
    }
}