/**
 * Game world orchestrating rendering, collisions, and UI bars.
 */
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
    bossHurtSound = new Audio('audio/boss_hurt.mp3');
    characterHurtSound = new Audio('audio/character_hurt.mp3');
    lastBottleThrow = 0;

    canvas;
    ctx;
    keyboard;
    camera_x;

    /**
     * Initialize the world with canvas and keyboard input, then start loops.
     * @param {HTMLCanvasElement} canvas - The main game canvas.
     * @param {Keyboard} keyboard - Input state container.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Link world references to entities and initialize collectible positions.
     */
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

    /**
     * Main game loop for collisions and throwing checks.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }

    /**
     * Aggregate collision checks for enemies, coins, bottles, and boss hits.
     */
    checkCollisions() {
        this.collidingWithEnemy();
        this.collectingCoins();
        this.collectingBottles();
        this.checkBottleHitsEndboss();
    }

    /**
     * Spawn a throwable bottle if input pressed, available bottles exist, and cooldown passed.
     */
    checkThrowObjects() {
        const now = Date.now();
        if (this.keyboard.D && this.bottleCount > 0 && now - this.lastBottleThrow > 1000) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.bottleCount--;
            this.bottleBar.setPercentage(this.bottleCount * 20);
            this.lastBottleThrow = now;
        }
    }

    /**
     * Render loop: UI, objects, and frame scheduling.
     */
    draw() {
        this.showGameOverScreens();
        this.clearAndTranslateCanvas();
        this.drawBackgroundAndUI();
        this.drawGameObjects();
        this.resetCanvasTransform();
        this.requestNextFrame();
    }

    /**
     * Toggle win/lose overlays and render the character on death.
     */
    showGameOverScreens() {
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
    }

    /**
     * Clear the canvas and apply camera translation.
     */
    clearAndTranslateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draw background layers and UI elements.
     */
    drawBackgroundAndUI() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.endbossBar);
    }

    /**
     * Draw all game entities and projectiles.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
    }

    resetCanvasTransform() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Schedule the next animation frame to continue rendering.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draw a single object, handling horizontal flip if needed.
     * @param {MovableObject|DrawableObject} mo - Object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flip an image horizontally before drawing.
     * @param {MovableObject|DrawableObject} mo - Object being drawn.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restore coordinates after a horizontal flip.
     * @param {MovableObject|DrawableObject} mo - Object drawn flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    /**
     * Render an array of objects onto the map.
     * @param {Array<MovableObject|DrawableObject>} objects - Items to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Handle collisions between the character and enemies, applying damage or stomps.
     */
    collidingWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy !== 0 && !this.character.isHurt()) {
                this.character.hit();
                if (!window.isMuted)
                this.characterHurtSound.play();
                this.statusBar.setPercentage(this.character.energy);
            } else if (this.character.isOnChicken(enemy)) {
                enemy.energy = 0;
            }
        });
    }

    /**
     * Collect coins on collision and update the coin bar.
     */
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

    /**
     * Collect bottles on collision (up to cap) and update the bottle bar.
     */
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

    /**
     * Check thrown bottles against the endboss, apply damage and splash handling.
     */
    checkBottleHitsEndboss() {
        const endboss = this.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;
        this.throwableObjects = this.throwableObjects.filter(bottle => {
            if (bottle.isSplashed) return false;
            if (bottle.isColliding(endboss)) {
                if (!window.isMuted) this.bossHurtSound.play();
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

    /**
     * Set all enemies' energy to zero (used when boss is defeated).
     */
    allEnemiesDead(){
        this.level.enemies.forEach(enemy => {
            enemy.energy = 0;
        });
    }
}