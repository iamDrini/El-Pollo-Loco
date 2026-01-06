/**
 * Represents a static background layer object that spans the canvas height.
 * Extends the generic MovableObject for reuse of rendering logic.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Create a background object at a given horizontal position.
     * @param {string} imagePath - Source path of the background image.
     * @param {number} x - The x-coordinate where this background begins.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}