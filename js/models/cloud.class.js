class Cloud extends MovableObject{

    width = 400;
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        //Koordinaten der Hünchen um sie etwas weiter hinten zu platzieren
        this.x = 600 * Math.random();
        this.y = 20;
    }
}