class Cloud extends MovableObject{
    y = 20;
    width = 400;
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        //Koordinaten der Hünchen um sie etwas weiter hinten zu platzieren
        this.x = 600 * Math.random();
        this.animate();
    }
    animate(){
        this.moveLeft();
    }
}
