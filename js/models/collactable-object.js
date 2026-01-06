/**
 * Base class for items the player can collect, providing positioning and counting helpers.
 */
class CollactableObject extends MovableObject{

    /**
     * Create a collectable object.
     */
    constructor(){
        super();
    }

    /**
     * Increment a global counter when the item is collected.
     */
    collectItem(){
        counter++;
    }

    /**
     * Place the collectable at a random x-position within the level bounds.
     */
    initPosition() {
        this.x = 300 + this.world.level.level_end_x * Math.random();
    }
}