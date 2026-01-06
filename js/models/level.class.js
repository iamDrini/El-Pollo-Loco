/**
 * Represents a game level containing enemies, collectibles, background, and bounds.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Create a level with its populated entities and scenery.
     * @param {MovableObject[]} enemies - Enemies present in the level.
     * @param {Cloud[]} clouds - Clouds used for parallax backgrounds.
     * @param {BackgroundObject[]} backgroundObjects - Layered background objects.
     * @param {CollactableObject[]} coins - Coins placed in the level.
     * @param {CollactableObject[]} bottles - Bottles placed in the level.
     */
    constructor(enemies,clouds,backgroundObjects,coins,bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}