class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    bossStatusBar = new BossStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBossNearness();
        }, 1000 / 60);

        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.canThrow && this.character.ammo > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.ammo--;
            this.canThrow = false;
            this.character.resetIdleTimer();
            let percentage = this.character.ammo * 20;
            this.bottleStatusBar.setPercentage(percentage);
        }

        if (!this.keyboard.D) {
            this.canThrow = true;
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkBottleCollisions();
        this.checkCollectibleCollisions();
        this.checkCoinCollisions();
        this.checkShopPurchase();
    }

    checkEnemyCollisions() {
        let dynamicKillExecuted = false;

        this.level.enemies.forEach((enemy) => {
            if (this.isChicken(enemy) && !enemy.isDead && this.character.isColliding(enemy)) {
                if (this.isPepeJumpingOnOnTop(enemy)) {
                    enemy.isDead = true;
                    dynamicKillExecuted = true;

                    setTimeout(() => {
                        let index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                            this.level.enemies.splice(index, 1);
                        }
                    }, 1000);
                }
            }
        });

        if (dynamicKillExecuted) {
            this.character.speedY = 25;
        }

        if (!dynamicKillExecuted) {
            this.level.enemies.forEach((enemy) => {
                let isActiveEnemy = (enemy instanceof Endboss && !enemy.isDead()) || (!enemy.isDead && this.isChicken(enemy));

                if (isActiveEnemy && this.character.isColliding(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.isBroken) {
                const boss = this.level.enemies.find(e => e instanceof Endboss);
                if (boss && !boss.isDead() && bottle.isColliding(boss)) {
                    bottle.isBroken = true;
                    bottle.splash();
                    boss.hit();
                    this.bossStatusBar.setPercentage(boss.energy);

                    setTimeout(() => {
                        let bottleIndex = this.throwableObjects.indexOf(bottle);
                        if (bottleIndex > -1) {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }
                    }, 300);
                    return;
                }

                this.level.enemies.forEach((enemy) => {
                    if (this.isChicken(enemy) && !enemy.isDead && bottle.isColliding(enemy)) {
                        bottle.isBroken = true;
                        enemy.isDead = true;
                        bottle.splash();

                        setTimeout(() => {
                            let enemyIndex = this.level.enemies.indexOf(enemy);
                            if (enemyIndex > -1) {
                                this.level.enemies.splice(enemyIndex, 1);
                            }
                        }, 1000);

                        setTimeout(() => {
                            let bottleIndex = this.throwableObjects.indexOf(bottle);
                            if (bottleIndex > -1) {
                                this.throwableObjects.splice(bottleIndex, 1);
                            }
                        }, 300);
                    }
                });
            }
        });
    }

    executeEnemyJumpKill(enemy) {
        enemy.isDead = true;

        this.character.speedY = 25;

        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    isChicken(enemy) {
        return enemy instanceof Chicken || enemy instanceof SmallChicken;
    }

    isPepeJumpingOnOnTop(enemy) {
        return this.character.isAboveGround() && this.character.speedY <= 0;
    }

    executeEnemyJumpKill(enemy) {
        enemy.isDead = true;
        this.character.jump();

        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    checkBossNearness() {
        const boss = this.level.enemies.find(e => e instanceof Endboss);

        if (boss) {
            const distance = boss.x - this.character.x;

            if (distance < 500 && !boss.hadFirstContact) {
                boss.hadFirstContact = true;
            }
            if (distance < 40 && boss.isAlertFinished) {
                boss.triggerAttack();
            }
        }
    }

    checkCollectibleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.character.ammo < 5) {
                    this.character.ammo++;
                    this.level.bottles.splice(index, 1);
                    let percentage = this.character.ammo * 20;
                    this.bottleStatusBar.setPercentage(percentage);
                }
            }
        });
    }

    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                if (this.character.coins < 5) {
                    this.character.coins++;
                    this.coinStatusBar.setPercentage(this.character.coins * 20);
                    this.level.coins.splice(i, 1);
                }
            }
        }
    }

    checkShopPurchase() {
        if (this.keyboard.S && this.character.coins > 0 && this.character.ammo < 5) {
            this.character.coins--;
            this.character.ammo++;
            this.coinStatusBar.setPercentage(this.character.coins * 20);
            let percentage = this.character.ammo * 20;
            this.bottleStatusBar.setPercentage(percentage);
            this.keyboard.S = false;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        const boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss && boss.hadFirstContact) {
            this.addToMap(this.bossStatusBar);
        }

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}