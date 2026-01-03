class Chicken extends MovableObject {

    height = 80;
    width = 80;
    y = 350;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.energy = 5;
        this.x = 400 + 2500 * Math.random();
        this.speed = 2 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
        }, 100);
    }
}