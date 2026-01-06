class Cloud extends MovableObject{
    y = 20;
    width = 400;
    height = 250;
    speed=1;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 600 * Math.random();
        this.animate();
    }
    animate(){
        setInterval(() => {
        this.moveLeft();
        }, 200);
    }
}
