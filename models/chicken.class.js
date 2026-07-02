class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    isDead = false;
    soundPlayed = false;
    chicken_death_sound = new Audio('audio/regular_chicken_death1.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.offset.top = 0;
        this.offset.bottom = 0;
        this.offset.left = 5;
        this.offset.right = 5;
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.chicken_death_sound.volume = 0.2;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage(this.IMAGE_DEAD);
                this.playDeathSound();
            }
        }, 200);
    }

    playDeathSound() {
        if (!this.soundPlayed) {
            this.soundPlayed = true;
            this.chicken_death_sound.play();
        }
    }
}