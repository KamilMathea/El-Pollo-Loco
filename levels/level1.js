let level1;

function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

            new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3)
        ],
        [
            new CollectibleBottle(300, 355, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new CollectibleBottle(600, 355, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new CollectibleBottle(900, 355, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new CollectibleBottle(1300, 355, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new CollectibleBottle(1700, 355, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        ],
        [
            new Coin(400, 200),
            new Coin(600, 150),
            new Coin(800, 200),
            new Coin(850, 120),
            new Coin(1000, 150),
            new Coin(1000, 200)
        ]
    );
}