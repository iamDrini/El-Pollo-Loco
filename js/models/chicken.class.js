class Chicken extends MovableObject{

    height = 60;
    width = 60;
    y=370;
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        
        //Koordinaten der Hünchen um sie etwas weiter hinten zu platzieren
        this.x = 200 + 400 * Math.random();
    }
}