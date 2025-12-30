class ThrowableObject extends CollactableObject {
    isAboveGround() {
        return !this.isSplashed;
    }

    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    isSplashed = false;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_SPLASH);
        this.x = x + 50;
        this.y = y + 100;
        this.height = 70;
        this.width = 70;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 13;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.isSplashed) {
                this.x += 15;
            }
        }, 25);
    }

    animate() {
        const groundLevel = 450;
        this.animateInterval = setInterval(() => {
            if (!this.isSplashed && this.y + this.height >= groundLevel) {
                this.y = groundLevel - this.height;
                this.isSplashed = true;
                this.speedY = 0;
                this.startSplashAnimation();
            }
        }, 50);
    }

    startSplashAnimation() {
        this.currentImage = 0;
        let splashIndex = 0;
        this.splashInterval = setInterval(() => {
            if (splashIndex < this.IMAGE_SPLASH.length) {
                let path = this.IMAGE_SPLASH[splashIndex];
                this.img = this.imageCache[path];
                splashIndex++;
            } else {
                clearInterval(this.splashInterval);
            }
        }, 60);
    }
}