class World {
    character = new Character();
    coins = level1.coins;
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;

    canvas;
    ctx;
    keyboard;
    camera_x;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.level.coins.forEach(coin => {
            coin.world = this;
            coin.initPosition();
        });

    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    console.log('Collision with character ' + this.character.energy);
                }
            });
        },200);
    }

    draw() {
        //Clear Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);


        //Draw() wird in Schleife aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}