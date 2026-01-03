class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar(this.enemies.find(e => e instanceof Endboss));
    throwableObjects = [];
    coinCount = 0;
    bottleCount = 0;
    endboss = this.enemies.find(e => e instanceof Endboss);

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
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.enemies.find(e => e instanceof Endboss).world = this;
        this.level.coins.forEach(coin => {
            coin.world = this;
            coin.initPosition();
        });
        this.level.bottles.forEach(bottle => {
            bottle.world = this;
            bottle.initPosition();
        });

    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkCollisions() {
        this.collidingWithEnemy();
        this.collectingCoins();
        this.collectingBottles();
        this.checkBottleHitsEndboss();
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCount > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.bottleCount--;
            this.bottleBar.setPercentage(this.bottleCount * 20);
        }
    }

    draw() {
        const gameOverScreen = document.getElementById('game-over-screen');
        const gameWinScreen = document.getElementById('game-win-screen');
        if (this.character.isDead() && !window.gameIsRestarting) {
            gameOverScreen.style.display = 'flex';
            this.addToMap(this.character);
        } else {
            gameOverScreen.style.display = 'none';
        }
        if (this.endboss.isDead() && !window.gameIsRestarting) {
            gameWinScreen.style.display = 'flex';
            this.allEnemiesDead();
        } else {
            gameWinScreen.style.display = 'none';
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.endbossBar);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

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

    collidingWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy !== 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            } else if (this.character.isOnChicken(enemy)) {
                enemy.energy = 0;
            }
        });
    }

    collectingCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCount++;
                this.coinBar.setPercentage(this.coinCount * 20);
                return false;
            }
            return true;
        });
    }

    collectingBottles() {
        if (this.bottleCount < 5)
            this.level.bottles = this.level.bottles.filter((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.bottleCount++;
                    this.bottleBar.setPercentage(this.bottleCount * 20);
                    return false;
                }
                return true;
            });
    }

    checkBottleHitsEndboss() {
        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;
        this.throwableObjects = this.throwableObjects.filter(bottle => {
            if (bottle.isSplashed) return false;
            if (bottle.isColliding(endboss)) {
                endboss.energy -= 20;
                if (endboss.energy < 0) endboss.energy = 0;
                this.endbossBar.setPercentage(endboss.energy);
                bottle.isSplashed = true;
                if (typeof bottle.startSplashAnimation === 'function') bottle.startSplashAnimation();
                return false;
            }
            return true;
        });
    }

    allEnemiesDead(){
        this.level.enemies.forEach(enemy => {
            enemy.energy = 0;
        });
    }
}