/**
 * Displays the coin status bar and swaps sprites based on collected coins.
 */
class CoinBar extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percentages = 100;

      /**
        * Create a coin bar at its fixed screen position and preload images.
        */
      constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 30;
        this.width= 200;
        this.height = 55;
        this.setPercentage(0);
    }
}