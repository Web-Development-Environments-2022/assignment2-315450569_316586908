

class gohst {
    constructor(x, y, number_ghost) {
        this.line = x;
        this.column = y;
        var ghost = new Image(1, 1);
        if (number_ghost == 1){
            ghost.src = "./images/icons/ghost1.jpg"
            this.image = ghost1;
        }
        else if(number_ghost == 2){
            ghost.src = "./images/icons/ghost2.jpg"
            this.image = ghost2;
            }
        else{
            ghost.src = "./images/icons/ghost3.jpg"
            this.image = ghost3;
        }

    }


}