class Coin extends MovableObject{
    height = 140;
    width = 140;
    
    world;
    
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 0;
        this.y = 100 + 200 * Math.random();
    }
    initPosition() {
        this.x = this.world.level.level_end_x * Math.random();
    }

}