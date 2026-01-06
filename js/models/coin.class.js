/**
 * Collectable coin placed in the level with random vertical position.
 */
class Coin extends CollactableObject{
    height = 140;
    width = 140;
    
    world;
    
    /**
     * Create a coin at a default x-position and random y-offset.
     */
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 0;
        this.y = 100 + 200 * Math.random();
    }

}