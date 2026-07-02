class Endboss extends MovableObject {
    height = 400;
    width = 280;
    y = 55;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    hadFirstContact = false;
    isAlertFinished = false;
    isAttacking = false;
    speed = 0.5;
    entrance_sound = new Audio('audio/endboss_entrance1.mp3');
    soundPlayed = false;
    attack_sound = new Audio('audio/endboss_attack_sound.mp3');

    constructor() {
        super();
        this.loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.entrance_sound.volume = 0.4;
        this.attack_sound.volume = 0.4;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.hadFirstContact && this.isAlertFinished && !this.isAttacking && !this.isDead() && !this.isHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        let alertFrameCounter = 0;
        let attackFrameCounter = 0;
        let deadFrameCounter = 0;

        setInterval(() => {
            if (this.isDead()) {
                if (deadFrameCounter < this.IMAGES_DEAD.length) {
                    let path = this.IMAGES_DEAD[deadFrameCounter];
                    this.img = this.imageCache[path];
                    deadFrameCounter++;
                } else {
                    let path = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
                    this.img = this.imageCache[path];
                    gameWon();
                }

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            } else if (!this.hadFirstContact) {
                this.loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');

            } else if (this.hadFirstContact && !this.isAlertFinished) {
                if (!this.soundPlayed) {
                    this.soundPlayed = true;
                    this.entrance_sound.play();
                }
                if (alertFrameCounter < this.IMAGES_ALERT.length) {
                    let path = this.IMAGES_ALERT[alertFrameCounter];
                    this.img = this.imageCache[path];
                    alertFrameCounter++;
                } else {
                    this.isAlertFinished = true;
                }

            } else if (this.isAttacking) {
                if (attackFrameCounter < this.IMAGES_ATTACK.length) {
                    let path = this.IMAGES_ATTACK[attackFrameCounter];
                    this.img = this.imageCache[path];
                    attackFrameCounter++;
                } else {
                    this.isAttacking = false;
                    attackFrameCounter = 0;
                }

            } else if (this.hadFirstContact && this.isAlertFinished) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    triggerAttack() {
        if (!this.isAttacking && this.isAlertFinished && !this.isDead() && !this.isHurt()) {
            this.isAttacking = true;
            this.attack_sound.currentTime = 0;
            this.attack_sound.play();
        }
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}