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

    /**
     * Map a percentage value to an image index for status bars.
     * Returns an index from 0 to 5 based on the current percentage value.
     * @returns {number} Image index (0=empty, 5=full).
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Update the displayed health percentage and select the matching sprite.
     * @param {number} percentage - Value between 0 and 100 indicating boss health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}