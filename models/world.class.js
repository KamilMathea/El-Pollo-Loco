class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

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
        }
        if (!this.keyboard.D) {
            this.canThrow = true;
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
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
                if (!enemy.isDead && this.character.isColliding(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

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
