/**
 * Thrown salsa bottle with splash animation and simple physics.
 */
class ThrowableObject extends CollactableObject {
    salsaThrow = new Audio('audio/salsa_hit.mp3');
    isSplashed = false;

    /**
     * A thrown bottle stays 'above ground' until it splashes.
     * @returns {boolean} True until splash has occurred.
     */
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

    /**
     * Create a throwable bottle at character-relative coordinates and start its motion.
     * @param {number} x - Initial x-position (typically the character's x).
     * @param {number} y - Initial y-position (typically the character's y).
     */
    constructor(x, y, isFacingLeft = false) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_SPLASH);
        this.direction = isFacingLeft ? -1 : 1;
        this.otherDirection = isFacingLeft;
        this.x = x + 50 * this.direction;
        this.y = y + 100;
        this.height = 70;
        this.width = 70;
        this.throw();
        this.animate();
    }

    /**
     * Impart initial velocity, apply gravity, and move forward until splash.
     */
    throw() {
        this.speedY = 13;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.isSplashed) {
                this.x += 15 * this.direction;
            }
        }, 25);
    }

    /**
     * Detect ground contact to trigger splash animation once.
     */
    animate() {
        const groundLevel = 440;
        this.animateInterval = setInterval(() => {
            if (!this.isSplashed && this.y + this.height >= groundLevel) {
                this.y = groundLevel - this.height;
                this.isSplashed = true;
                this.speedY = 0;
                this.startSplashAnimation();
            }
        }, 10);
    }

    /**
     * Play splash sprite sequence and sound once the bottle hits the ground.
     */
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
        }, 10);
        this.salsaThrow.currentTime = 0.3;
        if (!window.isMuted)
        this.salsaThrow.play();
    }
}