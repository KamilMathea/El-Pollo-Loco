class CollectibleBottle extends MovableObject {
    width = 70;
    height = 70;

    constructor(x, y, imagePath) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(imagePath);

        this.offset.top = 10;
        this.offset.bottom = 10;
        this.offset.left = 15;
        this.offset.right = 15;
    }
}