/**
 * Status bar for the endboss showing remaining energy.
 */
class EndbossBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentages = 50;

    /**
     * Create an endboss bar bound to a specific endboss instance.
     * @param {Endboss} endboss - The boss whose health this bar represents.
     */
    constructor(endboss) {
        super();
        this.loadImages(this.IMAGES);
        this.endboss = endboss;
        this.x = endboss.x;
        this.y = 20;
        this.width = 200;
        this.height = 55;
        this.setPercentage(50);
    }

    /**
     * Draw the bar near the boss while it has energy remaining.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
     */
    draw(ctx) {
        if (this.endboss.energy > 0) {
            this.x = this.endboss.x + 50;
            super.draw(ctx);
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
    
    /**
     * Map the current percentage to the corresponding sprite index.
     * @returns {number} Index within IMAGES for the current health level.
     */
    resolveImageIndex() {
        if (this.percentage == 50) {
            return 5;
        } else if (this.percentage >= 40) {
            return 4;
        } else if (this.percentage >= 30) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}