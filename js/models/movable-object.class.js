class MovableObject extends DrawableObject {
    speed = 3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    applyGravityDead() {
        this.applyGravity();
        setInterval(() => {
            this.speedY = -3;
            this.y -= this.speedY;
        }, 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    //character.isColliding(chicken)
    isColliding(mo) {
        return this.x + this.width - 10 > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height

    }

    //character.jumpOnChicken
    isOnChicken(mo) {
        return this.x < mo.x + mo.width &&
            this.x + this.width - 25 > mo.x &&
            this.y + this.height < mo.y &&
            this.speedY < -10;
    }

    isReachable(endboss) {
        return this.x - endboss.x <= 300;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in milliseconds
        timepassed = timepassed / 1000; //difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        this.speedY = 25;
    }

}