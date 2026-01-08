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
        this.setPercentage(100);
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
}