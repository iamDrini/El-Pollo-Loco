/**
 * Base drawable entity supporting image loading and rendering.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Load a single image and set it as the active sprite.
     * @param {string} path - Source path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Render the current image onto the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preload an array of images into the cache for fast switching.
     * @param {string[]} arr - List of image source paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}