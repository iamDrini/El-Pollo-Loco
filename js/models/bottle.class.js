class Bottle extends CollactableObject{
    height = 70;
    width = 70;
    
    world;
    
    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 0;
        this.y = 360;
    }

    isColliding(mo) {
    return this.x < mo.x + mo.width &&
           this.x + this.width > mo.x &&
           this.y < mo.y + mo.height &&
           this.y + this.height > mo.y;
}

}