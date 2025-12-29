class CollactableObject extends MovableObject{
    counter;

    constructor(){
        super();
    }

    collectItem(){
        counter++;
    }

    initPosition() {
        this.x = 300 + this.world.level.level_end_x * Math.random();
    }
}