

class ghost {
    constructor(x, y, number_ghost) {
        this.line = x;
        this.column = y;
        var ghost = new Image(1, 1);
        if (number_ghost == 1){
            ghost.src = "./images/icons/ghost1.png";
            this.image = ghost;
        }
        else if(number_ghost == 2){
            ghost.src = "./images/icons/ghost2.png";
            this.image = ghost;
            }
        else if (number_ghost == 3){
            ghost.src = "./images/icons/ghost3.png";
            this.image = ghost;
        }
        else if (number_ghost == 4){
            ghost.src = "./images/icons/ghost4.png";
            this.image = ghost;
        }

    }
}