class candy{
    constructor(x ,y){
        this.line = x;
        this.column = y;
        this.points = 50;
        this.alive = true;
        var ig = new Image(1, 1);
        ig.src = "./images/icons/candy.png"
        this.image = ig
    }
}