/**
 * Base class for movable entities with physics helpers and collision checks.
 */
class MovableObject extends DrawableObject {
    speed = 3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit;

    /**
     * Apply gravity over time, updating vertical speed and position while airborne.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Apply a simple downward drift for dead entities.
     */
    applyGravityDead() {
        this.applyGravity();
        setInterval(() => {
            this.speedY = -3;
            this.y -= this.speedY;
        }, 25);
    }

    /**
     * Determine if the object is above ground level.
     * @returns {boolean} True if airborne or throwable (always true for ThrowableObject).
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Axis-aligned bounding-box collision check with padding on the right side.
     * @param {MovableObject|DrawableObject} mo - Target object to test.
     * @returns {boolean} True if bounding boxes overlap.
     */
    isColliding(mo) {
        return this.x + this.width - 35 > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height

    }

    /**
     * Check if this object lands on top of another (used for stomping chickens).
     * @param {MovableObject} mo - Target to test against.
     * @returns {boolean} True if above and descending fast.
     */
    isOnChicken(mo) {
        return this.x < mo.x + mo.width &&
            this.x + this.width - 25 > mo.x &&
            this.y + this.height < mo.y &&
            this.speedY < -10;
    }

    /**
     * Check proximity to an endboss for triggering behaviors.
     * @param {Endboss} endboss - Boss to test distance against.
     * @returns {boolean} True if within 450px.
     */
    isReachable(endboss) {
        return this.x - endboss.x <= 450;
    }

    /**
     * Reduce energy when hit and track the last hit time.
     */
    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determine if the entity is in a temporary hurt state.
     * @returns {boolean} True if less than 1s since last hit.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Check if energy is depleted.
     * @returns {boolean} True if energy is zero.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Cycle through an image array to animate the object.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /** Move left by current speed. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Move right by current speed. */
    moveRight() {
        this.x += this.speed;
    }

    /** Impart upward velocity to start a jump. */
    jump() {
        this.speedY = 25;
    }

}