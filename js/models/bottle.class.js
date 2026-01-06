/**
 * Collectable salsa bottle lying on the ground.
 */
class Bottle extends CollactableObject {
    height = 70;
    width = 70;

    world;

    /**
     * Create a bottle at the default ground position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 0;
        this.y = 360;
    }

    /**
     * Axis-aligned bounding-box collision check against another object.
     * @param {MovableObject|CollactableObject} mo - Object to test collision against.
     * @returns {boolean} True if the bottle overlaps the target.
     */
    isColliding(mo) {
        return this.x < mo.x + mo.width &&
            this.x + this.width > mo.x &&
            this.y < mo.y + mo.height;
    }
}