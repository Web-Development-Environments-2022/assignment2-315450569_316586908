var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var ghostInterval;
var users = new Array();
var upMove;
var downMove;
var leftMove;
var rightMove;
var node;
var tmpnode;
var tmpnode_2;
var textnode;
var numberOfBalls;
var fivePointballColour;
var fifteenPointballColour;
var TwentyfivePointvallColour;
var gameDuration;
var numOfGhosts;
var pacman;
var cant_visit = new Array();
var ghost1;
var ghost2;
var ghost3;
var ghost4;
var darPacman;
var ghosts;
var pacman_remain;
var lives;
var onelive;
var global_numBalls;
var audio;
var scoreRemain;
var timer;
var candy_icon;

// var emptyCell;


$(document).ready(function() {
	context = canvas.getContext("2d");
	// window.onscroll = function() {scrollFunction()};
	openHome();

	//defualtIconMove
	pacman = new Image(1,1);
	pacman.src = "./images/icons/pacman_right.jpg";


	//default values//
	users[0] = ["k","k"];
	upMove = 38;
	downMove = 40;
	leftMove = 37;
	rightMove = 39;
	numberOfBalls = 70;
	gameDuration = 100;
	audio=false;
	

	
	//insert the cells are not wall drawing but can`t get them.
	cant_visit.push([0,8]);
	cant_visit.push([1,8]);
	cant_visit.push([2,8]);
	cant_visit.push([0,12]);
	cant_visit.push([1,12]);
	cant_visit.push([2,12]);
	cant_visit.push([24,8]);
	cant_visit.push([23,8]);
	cant_visit.push([22,8]);
	cant_visit.push([24,12]);
	cant_visit.push([23,12]);
	cant_visit.push([22,12]);



	
});

function Start() {
	lives = 5;
	displayLives(lives);
	resetGame();
	document.getElementById("lbluser_op").innerHTML = $("#username_login_input").val();
	window.onscroll = function() {GameMode_scrollFunction()};
	lblTime.style.color = "white";
	$("#time_label").css("color", "white");


	//setAUDIo
	audioAction();
	
	board = new Array();
	score = 0;
	var cnt = 500;
	var food_remain = numberOfBalls;
	var ball5 = Math.floor(numberOfBalls * 0.6);
	var ball15 = Math.floor(numberOfBalls * 0.3);
	var ball25 = Math.floor(numberOfBalls * 0.1);
	global_numBalls = ball5 + ball15 + ball25;
	pacman_remain = 1;
	scoreRemain = 0;
	timer = 1;
	candy_icon = new candy(10,10);
	
	start_time = new Date();
	for (var i = 0; i < 25 ; i++) {
		board[i] = new Array();
		for (var j = 0; j < 21; j++) {
			if (
				//border
				(i == 0) || (j==0) || (i == 24) || (j == 20) ||
				
				//from j==0 until j==4 (j->line)
				(i == 12) && (j == 1) || (i == 12) && (j == 2) || (i == 12) && (j == 3) ||

				(i == 2) && (j == 2) || (i == 3) && (j == 2) || (i == 2) && (j == 3) || (i == 3) && (j == 3) ||

				(i == 5) && (j == 2) ||	(i == 6) && (j == 2) ||	(i == 7) && (j == 2) ||	(i == 5) && (j == 3) ||	(i == 6) && (j == 3) ||	(i == 7) && (j == 3) ||

				(i == 9) && (j == 2) || (i == 10) && (j == 2) || (i == 9) && (j == 3) || (i == 10) && (j == 3) ||
				
				(i == 14) && (j == 2) || (i == 15) && (j == 2) || (i == 14) && (j == 3) || (i == 15) && (j == 3) ||

				(i == 17) && (j == 2) || (i == 18) && (j == 2) || (i == 19) && (j == 2) || (i == 17) && (j == 3) || (i == 18) && (j == 3) || (i == 19) && (j == 3) ||

				(i == 21) && (j == 2) || (i == 22) && (j == 2) || (i == 21) && (j == 3) || (i == 22) && (j == 3) ||

				//from here each line is line like board..

				(i == 2) && (j == 5) || (i == 3) && (j == 5) || (i == 5) && (j == 5) || (i == 7) && (j == 5) || (i == 8) && (j == 5) || (i == 9) && (j == 5) || (i == 10) && (j == 5) || (i == 11) && (j == 5) || (i == 12) && (j == 5) || (i == 13) && (j == 5) || (i == 14) && (j == 5) || (i == 15) && (j == 5) || (i == 16) && (j == 5) || (i == 17) && (j == 5) || (i == 19) && (j == 5) || (i == 21) && (j == 5) || (i == 22) && (j == 5) ||

				(i == 5) && (j == 6) || (i == 5) && (j == 6) || (i == 12) && (j == 6) || (i == 19) && (j == 6) ||

				(i == 1) && (j == 7) || (i == 2) && (j == 7) || (i == 3) && (j == 7) || (i == 5) && (j == 7) || (i == 6) && (j == 7) || (i == 7) && (j == 7) || (i == 8) && (j == 7) || (i == 9) && (j == 7) || (i == 10) && (j == 7) || (i == 12) && (j == 7) || (i == 14) && (j == 7) || (i == 15) && (j == 7) || (i == 16) && (j == 7) || (i == 17) && (j == 7) || (i == 18) && (j == 7) || (i == 19) && (j == 7) || (i == 21) && (j == 7) || (i == 22) && (j == 7) || (i == 23) && (j == 7) ||

				(i == 3) && (j == 8) || (i == 5) && (j == 8) || (i == 19) && (j == 8) || (i == 21) && (j == 8) || 

				(i == 1) && (j == 9) || (i == 2) && (j == 9) || (i == 3) && (j == 9) || (i == 5) && (j == 9) || (i == 7) && (j == 9) || (i == 8) && (j == 9) || (i == 9) && (j == 9) || (i == 10) && (j == 9) || (i == 11) && (j == 9) || (i == 13) && (j == 9) || (i == 14) && (j == 9) || (i == 15) && (j == 9) || (i == 16) && (j == 9) || (i == 17) && (j == 9) || (i == 19) && (j == 9) || (i == 21) && (j == 9) || (i == 22) && (j == 9) || (i == 23) && (j == 9) ||

				//midel of board.
				(i == 7) && (j == 10) || (i == 17) && (j == 10) || 

				(i == 1) && (j == 11) || (i == 2) && (j == 11) || (i == 3) && (j == 11) || (i == 5) && (j == 11) || (i == 7) && (j == 11) || (i == 8) && (j == 11) || (i == 9) && (j == 11) || (i == 10) && (j == 11) || (i == 11) && (j == 11) || (i == 13) && (j == 11) || (i == 14) && (j == 11) || (i == 15) && (j == 11) || (i == 16) && (j == 11) || (i == 17) && (j == 11) || (i == 19) && (j == 11) || (i == 21) && (j == 11) || (i == 22) && (j == 11) || (i == 23) && (j == 11) ||

				(i == 3) && (j == 12) || (i == 5) && (j == 12) || (i == 19) && (j == 12) || (i == 21) && (j == 12) ||

				(i == 1) && (j == 13) || (i == 2) && (j == 13) || (i == 3) && (j == 13) || (i == 5) && (j == 13) || (i == 6) && (j == 13) || (i == 7) && (j == 13) || (i == 8) && (j == 13) || (i == 9) && (j == 13) || (i == 10) && (j == 13) || (i == 12) && (j == 13) || (i == 14) && (j == 13) || (i == 15) && (j == 13) || (i == 16) && (j == 13) || (i == 17) && (j == 13) || (i == 18) && (j == 13) || (i == 19) && (j == 13) || (i == 21) && (j == 13) || (i == 22) && (j == 13) || (i == 23) && (j == 13) ||

				(i == 5) && (j == 14) || (i == 5) && (j == 14) || (i == 12) && (j == 14) || (i == 19) && (j == 14) ||

				(i == 2) && (j == 15) || (i == 3) && (j == 15) || (i == 5) && (j == 15) || (i == 7) && (j == 15) || (i == 8) && (j == 15) || (i == 9) && (j == 15) || (i == 10) && (j == 15) || (i == 11) && (j == 15) || (i == 12) && (j == 15) || (i == 13) && (j == 15) || (i == 14) && (j == 15) || (i == 15) && (j == 15) || (i == 16) && (j == 15) || (i == 17) && (j == 15) || (i == 19) && (j == 15) || (i == 21) && (j == 15) || (i == 22) && (j == 15) ||

				//from j == 16 until j==20 (j->line)
				(i == 12) && (j == 19) || (i == 12) && (j == 18) || (i == 12) && (j == 17) ||

				(i == 2) && (j == 18) || (i == 3) && (j == 18) || (i == 2) && (j == 17) || (i == 3) && (j == 17) ||

				(i == 5) && (j == 18) || (i == 6) && (j == 18) || (i == 7) && (j == 18) || (i == 5) && (j == 17) || (i == 6) && (j == 17) || (i == 7) && (j == 17) ||

				(i == 9) && (j == 18) || (i == 10) && (j == 18) || (i == 9) && (j == 17) || (i == 10) && (j == 17) ||
				
				(i == 14) && (j == 18) || (i == 15) && (j == 18) || (i == 14) && (j == 17) || (i == 15) && (j == 17) ||

				(i == 17) && (j == 18) || (i == 18) && (j == 18) || (i == 19) && (j == 18) || (i == 17) && (j == 17) || (i == 18) && (j == 17) || (i == 19) && (j == 17) ||

				(i == 21) && (j == 18) || (i == 22) && (j == 18) || (i == 21) && (j == 17) || (i == 22) && (j == 17) 

			) { if( !((i == 0) && (j == 8) || (i == 24) && (j == 8) || (i == 0) && (j == 10) || (i == 24) && (j == 10) || (i == 0) && (j == 12) || (i == 24) && (j == 12)) ){
					board[i][j] = "W";
				}
		
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt && !checkCantVisit(i,j)){
					var randomNum2 = Math.floor(Math.random() * (3-0) + 0);
					if (randomNum2 == 0){
						if (ball5>0){
							board[i][j] = "F5";
							scoreRemain = scoreRemain + 5;
							ball5--;
						}
						else
							{
								if (ball15>0){
									randomNum2=1;
								}
								else
									randomNum2=2;
							}
					}
					if (randomNum2 == 1){
						if (ball15>0){
							board[i][j] = "F15";
							scoreRemain = scoreRemain + 15;

							ball15--;
						}
						else{
							if(ball25 >0){
								randomNum2=2;
							}
						}
					}
					if (randomNum2 == 2 && ball25>0){
						board[i][j] = "F25";
						scoreRemain = scoreRemain + 25;

						ball25--;
					}
					food_remain--;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && !checkCantVisit(i,j) && 
								((i >= 6 && i <= 12) || (j >=6 && j <=18) ) ) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = "P";
				}else {
					board[i][j] = "E";
				}
				cnt--;
			}
		}
	}

	setGhosts();

	// if pacman not on the board yet
	while (pacman_remain > 0){
		randomPositionPacMan();
	}
	// put all the remain food on board
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (ball5>0){
			board[emptyCell[0]][emptyCell[1]] = "F5";
			scoreRemain = scoreRemain + 5;

			ball5--;
		}
		else if (ball15>0){
			board[emptyCell[0]][emptyCell[1]] = "F15";
			scoreRemain = scoreRemain + 15;

			ball15--
		}
		else if (ball25>0){
			board[emptyCell[0]][emptyCell[1]] = "F25";
			scoreRemain = scoreRemain + 25;

			ball25--
		}
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	
	interval = setInterval(UpdatePosition, 180);
	ghostInterval = setInterval(updateGhostsposition, 300);
	

}
function audioAction(){
	// let mute = new Audio("assets/sounds/pacmanremix.mp3");
	var mute = document.getElementById("myAudio"); 
	
	if (audio){
		audio=false;
		$("#audioIG").attr('src', "./images/icons/muteAudioFix.png");
		mute.pause(); 
		mute.autoplay = true;
	}
	else{
		audio=true;
		$("#audioIG").attr('src', "./images/icons/audioIcon.png");
		mute.volume = 0.1;
		mute.play();

	}
	
}
// ghost eat pacman
function audioActionDeath(){
	// let mute = new Audio("assets/sounds/pacmanremix.mp3");
	var mute = document.getElementById("myAudioDeath"); 	
	var p = document.getElementById("myAudio"); 
	if (audio){
		p.pause();
		mute.play();
		setTimeout(function(){
			document.getElementById("myAudio").play();	
		  }, 1500)

	}
	
}

function setGhosts(){
	ghost1 = new ghost(1,1,1);
	ghost2 = new ghost(23,1,2);
	ghost3 = new ghost(1,19,3);
	ghost4 = new ghost(23,19,4);
	var tmp_ghosts = new Array(ghost1,ghost2,ghost3,ghost4);
	ghosts = new Array();
	for (var i = 0 ; i < numOfGhosts; i++){
		ghosts.push(tmp_ghosts[i]);
	}
}

function randomPositionPacMan(){
	let random_i = Math.floor(Math.random() * (12-6) + 6);
	let random_j = Math.floor(Math.random() * (18-6) + 6);
	if ((board[random_i][random_j] == "E" || board[random_i][random_j] == "F5" ||
		 board[random_i][random_j] == "F15" || board[random_i][random_j] == "F25") &&
		  !checkCantVisit(random_i,random_j))
		{
			shape.i = random_i;
			shape.j = random_j;
			pacman_remain--;
			board[shape.i][shape.j] = "P";
		}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 24 + 1);
	var j = Math.floor(Math.random() * 20 + 1);
	while (board[i][j] != "E" || checkCantVisit(i,j)) {
		i = Math.floor(Math.random() * 24 + 1);
		j = Math.floor(Math.random() * 20 + 1);
	}
	return [i, j];
}

function resetGame(){
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);
	$("td.los").children("a").text("You are better than " + score +" points!");
	if (audio){
		audioAction();
	}
}

function checkCantVisit(i,j){
	for (var z = 0; z < cant_visit.length ; z++) {
		if (cant_visit[z][0] == i && cant_visit[z][1] == j)
			return true;
	}
	return false;
}

function GetKeyPressed() {
	if (keysDown[upMove]) {
		return 1;
	}

	if (keysDown[downMove]) {
		return 2;
	}
	if (keysDown[leftMove]) {
		return 3;
	}
	if (keysDown[rightMove]) {
		return 4;
	}
}

function Draw(darPacman) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	moveFrom = darPacman; //1 up, 2 down, 3 left, 4 right
	for (var i = 0; i < 25; i++) {
		for (var j = 0; j < 21; j++) {
			var center = new Object();
			center.x = i * 40 + 30;
			center.y = j * 40 + 30;
			if (board[i][j] == "P") {
				pacman_img = new Image(1,1);
				if (moveFrom==1){ //pacman move up
					pacman_img.src = "./images/icons/pacman_up.jpg";
					pacman = pacman_img;
				}
				else if(moveFrom==2){ //pacman move down
					pacman_img.src = "./images/icons/pacman_down.jpg";
					pacman = pacman_img;	
				}
				else if(moveFrom==3){ //pacman move left
					pacman_img.src = "./images/icons/pacman_left.jpg";
					pacman = pacman_img;	
				}
				else if(moveFrom==4){ //pacman move right
					pacman_img.src = "./images/icons/pacman_right.jpg";
					pacman = pacman_img;
				}
				else{
					pacman_img = pacman;
				}
				context.drawImage(pacman_img,center.x-35, center.y-35, 50, 50);
			} 
			else if (board[i][j] == "F5") {
				context.beginPath();
				context.arc(center.x-10, center.y-10, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = fivePointballColour; //color
				context.fill();
			}
			else if (board[i][j] == "F15") {
				context.beginPath();
				context.arc(center.x-10, center.y-10, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenPointballColour; //color
				context.fill();
			}
			else if (board[i][j] == "F25") {
				context.beginPath();
				context.arc(center.x-10, center.y-10, 13, 0, 2 * Math.PI); // circle
				context.fillStyle = TwentyfivePointvallColour; //color
				context.fill();
			} else if (board[i][j] == "W") {

				wall_img = new Image(10,10);
				wall_img.src = "./images/wall.png";
				context.drawImage(wall_img,center.x-35, center.y-35, 50, 50);

			}
			
			if ((i==0) && (j==10)){
				var img = new Image(1,1);
				img.src = "./images/icons/jump_imgLeft.png"
				context.drawImage(img,center.x-35, center.y-35, 50, 50);
			}
			if ((i==24) && (j==10)){
				var img = new Image(1,1);
				img.src = "./images/icons/jump_imgRight.png"
				context.drawImage(img,center.x-35, center.y-35, 50, 50);
			}
			if ((i==12)&&(j==10) && (timer==1)){
				var img = new Image(1,1);
				img.src = "./images/icons/timer.png"
				context.drawImage(img,center.x-35, center.y-35, 50, 50);
			}
			// draw candy
			if (i == candy_icon.line && j == candy_icon.column && candy_icon.alive)
				context.drawImage(candy_icon.image,center.x-35, center.y-35, 50, 50);

			// draw ghosts
			for (var z = 0 ; z < ghosts.length ; z++){
				if (i == ghosts[z].line && j ==ghosts[z].column){
					context.drawImage(ghosts[z].image,center.x-35, center.y-35, 50, 50);
				}
			}
			

		}
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = "E";
	darPacman = GetKeyPressed();
	if (darPacman == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != "W") {
			shape.j--;
		}
	}
	if (darPacman == 2) {
		if (shape.j < 20 && board[shape.i][shape.j + 1] != "W") {
			shape.j++;
		}
	}
	if (darPacman == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != "W") {
			shape.i--;
		}
		else if((shape.i == 0)&&(shape.j==10)){
			shape.i = shape.i + 24;
		}
	}
	if (darPacman == 4) {
		if (shape.i < 24 && board[shape.i + 1][shape.j] != "W") {
			shape.i++;
		}
		else if((shape.i == 24)&&(shape.j==10)){
			shape.i = shape.i - 24;
		}
	}
	if (board[shape.i][shape.j] == "F5") {
		score = score + 5;
		global_numBalls--;
		scoreRemain = scoreRemain -5;
	}
	if (board[shape.i][shape.j] == "F15") {
		score = score + 15;
		global_numBalls--;
		scoreRemain = scoreRemain - 15;

	}
	if (board[shape.i][shape.j] == "F25") {
		score = score + 25;
		global_numBalls--;
		scoreRemain = scoreRemain -25;

	}

	for (var i = 0; i < ghosts.length; i++){
		if (
			(shape.i == ghosts[i].line && shape.j == ghosts[i].column)
		)
		{
			score = score - 10;
			// lives decrease
			lives--;
			audioActionDeath();
			randomPositionPacMan();
			setGhosts();
			displayLives(lives);
			
		}
	}

	if (shape.i == candy_icon.line && shape.j == candy_icon.column && candy_icon.alive)
	{
		score = score + candy_icon.points;
		candy_icon.alive = false;
	}
	
	board[shape.i][shape.j] = "P";
	var currentTime = new Date();
	if ((shape.i==12)&&(shape.j==10)&&(timer==1)){
		timer--;
		var time_number = parseInt(time_elapsed);
		var timerIncrees = time_number+30;
		time_elapsed = timerIncrees.toString()

	}
	else{
		if (timer==0){
			time_elapsed = gameDuration/1000 + (gameDuration - (currentTime - start_time) / 1000);
			time_elapsed = time_elapsed.toFixed(0);
			var time_number = parseInt(time_elapsed);
			var timerIncrees = time_number+30;
			time_elapsed = timerIncrees.toString()

		}
		else{
			time_elapsed = gameDuration/1000 + (gameDuration - (currentTime - start_time) / 1000);
			time_elapsed = time_elapsed.toFixed(0);
		}
	}

	if (time_elapsed <= 10) {
		lblTime.style.color = "red";
		$("#time_label").css("color", "red");
	}
	else{
		lblTime.style.color = "white";
		$("#time_label").css("color", "white");
	}
	if (scoreRemain == 0) {
		endGameWinner();
	}

	if (time_elapsed == 0){// time is up
		if (score < 100)
			endGameLoser(); 
		else
			endGameWinner();
	}
	else {
		Draw(darPacman);
	}
}


function endGameWinner(){
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);
	document.getElementById("loser").style.display = "none";
	document.getElementById("winner").style.display = "block";
	if (audio){
		audioAction();
	}
	resetGame();
	//click X
	(document.getElementsByClassName("closeWin")[0]).onclick = function() {
		document.getElementById("winner").style.display = "none";
		settingpage();
	}
}
// time is up and score < 100
function endGameLoser(){
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);
	document.getElementById("loser").style.display = "block";
	document.getElementById("winner").style.display = "none";
	document.getElementById('los').innerHTML= "You are better than " + score +" points!";
	
	audioAction()
	resetGame();
	//click X
	(document.getElementsByClassName("closelose")[0]).onclick = function() {
		document.getElementById("loser").style.display = "none";
		settingpage();
	}
}

// no more lives
function endGameLoserIMG(){
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);
	document.getElementById("loser").style.display = "block";
	document.getElementById("winner").style.display = "none";
	resetGame();
	// if (audio){
	// 	audioAction();
	// }
	audioAction();
	(document.getElementsByClassName("closelose")[0]).onclick = function() {
		document.getElementById("loser").style.display = "none";
		settingpage();
	}
}

function updateGhostsposition(){

	if (numOfGhosts == 1){
		smartMoveGhosts(ghosts[0]);
	}
	if (numOfGhosts == 2){
		smartMoveGhosts(ghosts[0]);
		smartMoveGhosts(ghosts[1]);
	}
	if (numOfGhosts == 3){
		randomMoveGhosts(ghosts[0]);
		randomMoveGhosts(ghosts[1]);
		smartMoveGhosts(ghosts[2]);
	}
	if (numOfGhosts == 4){
		randomMoveGhosts(ghosts[2]);
		randomMoveGhosts(ghosts[1]);
		smartMoveGhosts(ghosts[0]);
		smartMoveGhosts(ghosts[3]);
	}

	randomMoveCandy(candy_icon);


	Draw(darPacman);
}

function randomMoveCandy(c){
	var neighbors = findNeighbors(c.line,c.column);
	var step = neighbors[Math.floor(Math.random()*neighbors.length)];
	c.line = step[0];
	c.column = step[1];
	// board[step[0]][step[1]] = "C";
	
}

function smartMoveGhosts(g){
	var neighbors = findNeighbors(g.line,g.column);
	var min_distance = 1000;
	var step;
	for (var i=0; i< neighbors.length ; i++){
		var distance = Math.sqrt(Math.pow(shape.i - neighbors[i][0],2) + Math.pow(shape.j - neighbors[i][1],2));
		if (distance < min_distance){
			min_distance = distance;
			step = neighbors[i];
		}
	}
	g.line = step[0];
	g.column = step[1];
}

function randomMoveGhosts(g){
	var neighbors = findNeighbors(g.line,g.column);
	var step = neighbors[Math.floor(Math.random()*neighbors.length)];
	g.line = step[0];
	g.column = step[1];
}

function findNeighbors(x,y){
	var neighbors = new Array();
	if (x == 0 && j == 10){
		neighbors.push([x+1,y]);
		return neighbors;
	}
	if (x == 24 && j == 10){
		neighbors.push([x-1,y]);
		return neighbors;
	}
	if (board[x+1][y] == "P" || board[x+1][y] == "E" || board[x+1][y] == "F5" || board[x+1][y] == "F15" || board[x+1][y] == "F25")
		neighbors.push([x+1,y]);
	if (board[x-1][y] == "P" || board[x-1][y] == "E" || board[x-1][y] == "F5" || board[x-1][y] == "F15" || board[x-1][y] == "F25")
		neighbors.push([x-1,y]);
	if (board[x][y+1] == "P" || board[x][y+1] == "E" || board[x][y+1] == "F5" || board[x][y+1] == "F15" || board[x][y+1] == "F25")
		neighbors.push([x,y+1]);
	if (board[x][y-1] == "P" || board[x][y-1] == "E" || board[x][y-1] == "F5" || board[x][y-1] == "F15" || board[x][y-1] == "F25")
		neighbors.push([x,y-1]);

	return neighbors;
}

function displayLives(num){
	if (num == 5){
		document.getElementById("lblLive1").style.display = "none";
		document.getElementById("lblLive2").style.display = "none";
		document.getElementById("lblLive3").style.display = "none";
		document.getElementById("lblLive4").style.display = "none";
		document.getElementById("lblLive5").style.display = "inline";
	}
	else if (num == 4){
		document.getElementById("lblLive1").style.display = "none";
		document.getElementById("lblLive2").style.display = "none";
		document.getElementById("lblLive3").style.display = "none";
		document.getElementById("lblLive5").style.display = "none";
		document.getElementById("lblLive4").style.display = "inline";
	}
	else if (num == 3){
		document.getElementById("lblLive1").style.display = "none";
		document.getElementById("lblLive2").style.display = "none";
		document.getElementById("lblLive4").style.display = "none";
		document.getElementById("lblLive5").style.display = "none";
		document.getElementById("lblLive3").style.display = "inline";
	}
	else if (num == 2){
		document.getElementById("lblLive1").style.display = "none";
		document.getElementById("lblLive3").style.display = "none";
		document.getElementById("lblLive4").style.display = "none";
		document.getElementById("lblLive5").style.display = "none";
		document.getElementById("lblLive2").style.display = "inline";
	}
	else if (num == 1){
		document.getElementById("lblLive2").style.display = "none";
		document.getElementById("lblLive3").style.display = "none";
		document.getElementById("lblLive4").style.display = "none";
		document.getElementById("lblLive5").style.display = "none";
		document.getElementById("lblLive1").style.display = "inline";
	}
	else
	{
		document.getElementById("lblLive1").style.display = "none";
		endGameLoserIMG();
	}

}


// window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	$("#menu").css("opacity", "1");
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("menu").style.top = "0";
	} else {
		document.getElementById("menu").style.top = "-50px";
	}
}

function GameMode_scrollFunction() {
	if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
	  document.getElementById("menu").style.top = "0";
	  $("#menu").css("opacity", "0.2");
	} else {
	  document.getElementById("menu").style.top = "-50px";
	  $("#menu").css("opacity", "1");
	}
  }


function openHome(){
	document.getElementById("register_div").style.display = "none";
	document.getElementById("login_page").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("about_page").style.display = "none";
	document.getElementById("GameOn").style.display = "none";
	document.getElementById("home_div").style.display = "block";
	window.onscroll = function() {scrollFunction()};
	resetGame();

}

function registerpage(){
	clear_submition();
	document.getElementById("login_page").style.display = "none";
	document.getElementById("home_div").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("about_page").style.display = "none";
	document.getElementById("GameOn").style.display = "none";
	document.getElementById("register_div").style.display = "block";
	window.onscroll = function() {scrollFunction()};
	resetGame();

	

}

function clear_submition(){
	document.getElementById("username_input").value = "Enter user name";
	document.getElementById("password_input").value = "Enter Password";
	document.getElementById("fullname_input").value = "Enter Full name";
	document.getElementById("email_input").value = "Enter E-mail";
	document.getElementById("birthday_input").value = "1990-01-01";
}

function submit(){
	const regExp_letter = /.*[a-zA-Z].*/;
	const regExp_number = /.*[0-9].*/;
	const regExp_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if ($("#username_input").val() == "Enter user name" || $("#username_input").val() == '' ||
	$("#password_input").val() == "Enter Password" || $("#password_input").val() == '' ||
	$("#fullname_input").val() == "Enter Full name" || $("#fullname_input").val() == '' ||
	$("#email_input").val() == "Enter E-mail" || $("#email_input").val() == '')
	{
		window.alert("One or More details was not entered.");
		return;
	}

	if ($("#password_input").val().length < 6 || !regExp_letter.test($("#password_input").val()) || !regExp_number.test($("#password_input").val()))
	{
		window.alert("the password is in correct. the password should contain at least one letter and at least one number and the password must be at least 6 characters.");
		return;
	}

	if (regExp_number.test($("#fullname_input").val()))
	{
		window.alert("the full name shouldn't contain numbers.");
		return;
	}

	if (!regExp_email.test($("#email_input").val()))
	{
		window.alert("The E-mail is not vaild.");
		return;
	}

	for (i = 0 ; i < users.length ; i++){
		if (users[i][0] == $("#username_input").val()){
			window.alert("this username is already in use");
			return;
		}
	}

	users.push([$("#username_input").val(), $("#password_input").val()]);
	
	window.alert("submition succesful");
	loginpage();

}

function loginpage(){
	document.getElementById("home_div").style.display = "none";
	document.getElementById("register_div").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("about_page").style.display = "none"
	document.getElementById("GameOn").style.display = "none";
	document.getElementById("login_page").style.display = "block";
	window.onscroll = function() {scrollFunction()};
	resetGame();


}

function login(){
	for (i = 0; i < users.length ; i++){
		if (users[i][0] == $("#username_login_input").val()){
			if (users[i][1] == $("#password_login_input").val()){
				settingpage();
				return;
			}
			else {
				window.alert("The password incorrect.");
				return;
			}
		}
	}

	window.alert("this user is not exist.");
}

function settingpage(){
	document.getElementById("login_page").style.display = "none";
	document.getElementById("home_div").style.display = "none";
	document.getElementById("register_div").style.display = "none";
	document.getElementById("editKey").style.display = "none";
	document.getElementById("saveMessage").style.display = "none";
	document.getElementById("about_page").style.display = "none";
	document.getElementById("GameOn").style.display = "none";
	document.getElementById("setting_page").style.display = "block";
	window.onscroll = function() {scrollFunction()};
	resetGame();

}

function chooseKeyBoard(e, text){
	$("#inputKeyBoard").val("Please enter your key...");
	removeAllChildren(document.getElementById("saveMessage"));
	document.getElementById("editKey").style.display = "block";
	switch (text){
		case 'up':
			document.getElementById("inputKeyBoard").onkeydown = editKeyUp;
			tmp_nodes();
			break;
		case 'down':
			document.getElementById("inputKeyBoard").onkeydown = editKeyDown;
			tmp_nodes();
			break;
		case 'left':
			document.getElementById("inputKeyBoard").onkeydown = editKeyLeft;
			tmp_nodes();
			break;
		case 'right':
			document.getElementById("inputKeyBoard").onkeydown = editKeyRight;
			tmp_nodes();
			break;
	}
}

function tmp_nodes(){
	node = document.createElement("h4");
	node.setAttribute("id", "node_h4");
	tmpnode = document.createElement("p");
	tmpnode.setAttribute("id", "tmpnode");
	node.appendChild(tmpnode);
	document.getElementById("saveMessage").appendChild(node);
}

function editKeyUp(e){
	upMove = e.keyCode;

	let tmpval = checkArrow(e.keyCode);
	if (tmpval != '')
		tmpnode_2 = document.createTextNode("The key "+ tmpval + " saved.");
	else
		tmpnode_2 = document.createTextNode("The key "+String.fromCharCode((96 <= upMove && upMove <= 105) ? upMove-48 : upMove) + " saved.");

	node.replaceChild(tmpnode_2,tmpnode);
	tmpnode = tmpnode_2;
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("saveMessage").style.display = "block";
	$("#inputKeyBoard").val('');
}

function editKeyDown(e){
	downMove = e.keyCode;

	let tmpval = checkArrow(e.keyCode);
	if (tmpval != '')
		tmpnode_2 = document.createTextNode("The key "+ tmpval + " saved.");
	else
		tmpnode_2 = document.createTextNode("The key "+  String.fromCharCode((96 <= downMove && downMove <= 105) ? downMove-48 : downMove) + " saved.");

	node.replaceChild(tmpnode_2,tmpnode);
	tmpnode = tmpnode_2;
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("saveMessage").style.display = "block";
	$("#inputKeyBoard").val('');
}

function editKeyLeft(e){
	leftMove = e.keyCode;

	let tmpval = checkArrow(e.keyCode);
	if (tmpval != '')
		tmpnode_2 = document.createTextNode("The key "+ tmpval + " saved.");
	else
		tmpnode_2 = document.createTextNode("The key "+ String.fromCharCode((96 <= leftMove && leftMove <= 105) ? leftMove-48 : leftMove) + " saved.");

	node.replaceChild(tmpnode_2,tmpnode);
	tmpnode = tmpnode_2;
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("saveMessage").style.display = "block";
	$("#inputKeyBoard").val('');
}

function editKeyRight(e){
	rightMove = e.keyCode;

	let tmpval = checkArrow(e.keyCode);
	if (tmpval != '')
		tmpnode_2 = document.createTextNode("The key "+ tmpval + " saved.");
	else
		tmpnode_2 = document.createTextNode("The key "+ String.fromCharCode((96 <= rightMove && rightMove <= 105) ? rightMove-48 : rightMove) + " saved.");

	node.replaceChild(tmpnode_2,tmpnode);
	tmpnode = tmpnode_2;
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("saveMessage").style.display = "block";
	$("#inputKeyBoard").val('');
}

function removeAllChildren(element) {
	while (element.firstChild) {
	  element.removeChild(element.firstChild)
	}
  }
function chooseNumberBalls(val) {

	document.getElementById("numberballs").innerHTML = val;  
	document.getElementById("numberballs").display = "block";
	
}

function chooseTimeGame(val) {

	document.getElementById("timeGame").innerHTML = val;  
	document.getElementById("timeGame").display = "block";
	
}

function chooseGhosts(val) {

	document.getElementById("ghosts").innerHTML = val;  
	document.getElementById("ghosts").display = "block";
	
}

function startGame(){
	//disable scroll with arrows
	window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);

	var w = window.screen.height;
	var h = window.screen.width;

	//save here all elements we need.
	numberOfBalls = $("#inputScaleBalls").val();
	fivePointballColour = $("#ball5").val();
 	fifteenPointballColour = $("#ball15").val();
 	TwentyfivePointvallColour = $("#ball25").val();
	gameDuration = $("#inputTimeGame").val();


	numOfGhosts = $("#inputGhost").val();
	document.getElementById("login_page").style.display = "none";
	document.getElementById("home_div").style.display = "none";
	document.getElementById("register_div").style.display = "none";
	document.getElementById("editKey").style.display = "none";
	document.getElementById("saveMessage").style.display = "none";
	document.getElementById("about_page").style.display = "none"
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("GameOn").style.display = "block";

	if (checkArrow(upMove) == 'up')
		document.getElementById("arrowup_s").innerHTML = 'up';
	else
		document.getElementById("arrowup_s").innerHTML = String.fromCharCode((96 <= upMove && upMove <= 105) ? upMove-48 : upMove);

	if (checkArrow(downMove) == 'down')
		document.getElementById("arrowdown_s").innerHTML = 'down';
	else
		document.getElementById("arrowdown_s").innerHTML = String.fromCharCode((96 <= downMove && downMove <= 105) ? downMove-48 : downMove);

	if (checkArrow(rightMove) == 'right')
		document.getElementById("arrowright_s").innerHTML = 'right';
	else
		document.getElementById("arrowright_s").innerHTML = String.fromCharCode((96 <= rightMove && rightMove <= 105) ? rightMove-48 : rightMove);

	if (checkArrow(leftMove) == 'left')
		document.getElementById("arrowleft_s").innerHTML = 'left';
	else
		document.getElementById("arrowleft_s").innerHTML = String.fromCharCode((96 <= leftMove && leftMove <= 105) ? leftMove-48 : leftMove);

	$("#inputScaleBalls_s").val(numberOfBalls);
	$("#numberballs_s").val(numberOfBalls);
	$("#ball5_s").val(fivePointballColour);
	
	$("#ball15_s").val(fifteenPointballColour);

	$("#ball25_s").val(TwentyfivePointvallColour);

	$("#inputTimeGame_s").val(gameDuration);
	$("#timeGame_s").val(gameDuration);
	
	$("#inputGhost_s").val(numOfGhosts);
	$("#ghosts_s").val(numOfGhosts);

	Start();
}

function aboutPage(){
	document.getElementById("about_page").style.display = "block";
	

	//click X
	(document.getElementsByClassName("close")[0]).onclick = function() {
		document.getElementById("about_page").style.display = "none";
	}
	// click outside dialog


	var dialog = document.getElementsByTagName('dialog')[0];
    dialog.showModal();
    dialog.addEventListener('click', function (event) {
        var rect = dialog.getBoundingClientRect();
        var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
          && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
			document.getElementById("about_page").style.display = "none";
			dialog.close();
			return;
        }
    });


	// click ESC
	window.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		document.getElementById("about_page").style.display = "none";

		return;
	}
	})

}

function checkArrow(val){
	
	if (val == 38)
		return 'up';
	else if (val == 40)
		return 'down';
	else if (val == 39)
		return 'right';
	else if (val == 37)
		return 'left';
	else 
		return '';

}

function randonDetails(){

	let num_balls = getRndInteger(50,90);
	$("#inputScaleBalls").val(num_balls);
	$("#numberballs").val(num_balls);

	let five_colour = '#' + Math.floor(Math.random()*16777215).toString(16);
	$("#ball5").val(five_colour);

	let fifteen_colour = '#' + Math.floor(Math.random()*16777215).toString(16);
	$("#ball15").val(fifteen_colour);

	let Twentyfive_colour = '#' + Math.floor(Math.random()*16777215).toString(16);
	$("#ball25").val(Twentyfive_colour);

	let game_dur = getRndInteger(60,180);
	$("#inputTimeGame").val(game_dur);
	$("#timeGame").val(game_dur);
	
	let num_ghost = getRndInteger(1,4);
	$("#inputGhost").val(num_ghost);
	$("#ghosts").val(num_ghost);

	numberOfBalls = $("#inputScaleBalls").val();
	fivePointballColour = $("#ball5").val();
 	fifteenPointballColour = $("#ball15").val();
 	TwentyfivePointvallColour = $("#ball25").val();
	gameDuration = $("#inputTimeGame").val();
	numOfGhosts = $("#inputGhost").val();
}

function contact(){

	aboutPage();

}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

