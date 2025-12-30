class ThrowableObject extends CollactableObject{

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x+50;
        this.y = y+100;
        this.height = 70;
        this.width = 70;
        this.throw();
    }

    throw(){
        this.speedY = 13;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}
//nur für die Flaschen zum Werfen!
//Für einsammeln und zeigen Klasse bottles verwenden