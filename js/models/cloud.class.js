/**
 * Background cloud that drifts to the left across the sky layer.
 */
class Cloud extends MovableObject{
    y = 20;
    width = 400;
    height = 250;
    speed=1;

    /**
     * Initialize cloud with random starting x-position and begin drifting animation.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 600 * Math.random();
        this.animate();
    }
    /**
     * Move the cloud left at a fixed interval to create parallax motion.
     */
    animate(){
        setInterval(() => {
        this.moveLeft();
        }, 200);
    }
}
