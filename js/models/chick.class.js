/**
 * Small chicken enemy with simple walking and death animation.
 */
class Chick extends MovableObject {

    height = 60;
    width = 60;
    y = 370;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Spawn a chick at a random x-position with slight speed variance and preload sprites.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.energy = 5;
        this.x = 400 + 2500 * Math.random();
        this.speed = 2 + Math.random() * 2;
        this.animate();
    }

    /**
     * Continuously move left and play walking animation; switch to dead sprite when defeated.
     */
    animate() {
        setInterval(() => {
        if (this.isDead()) {
            setTimeout(()=>{
                this.playAnimation(this.IMAGES_DEAD);
            },100);
        } else {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
        }, 100);
    }
}