var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users = new Array();
var upMove;
var downMove;
var leftMove;
var rightMove;
var node;

$(document).ready(function() {
	context = canvas.getContext("2d");
	// Start();
	openHome();
	var time = document.getElementById("time");
	var score = document.getElementById("score");
	var game = document.getElementById("game");
	time.style.display = "none";
	score.style.display = "none";
	game.style.display = "none";
	var registerpage = document.getElementById("register_div");
	registerpage.style.display = "none";
	users[0] = ["k","k"];
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
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
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
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

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("menu").style.top = "0";
  } else {
    document.getElementById("menu").style.top = "-50px";
  }
}

function openHome(){
	document.getElementById("register_div").style.display = "none";
	document.getElementById("login_page").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("home_div").style.display = "block";
	

}

function registerpage(){
	clear_submition();
	document.getElementById("login_page").style.display = "none";
	document.getElementById("home_div").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("register_div").style.display = "block";

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
}

function loginpage(){
	document.getElementById("home_div").style.display = "none";
	document.getElementById("register_div").style.display = "none";
	document.getElementById("setting_page").style.display = "none";
	document.getElementById("login_page").style.display = "block";

}

function login(){
	for (i = 0; i < users.length ; i++){
		if (users[i][0] == $("#username_login_input").val()){
			if (users[i][1] == $("#password_login_input").val())
				settingpage();
				return;
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
	document.getElementById("setting_page").style.display = "block";
}

function chooseUpKeyBoard(){
	document.getElementById("editKey").style.display = "block";
	node = document.createElement("h4");
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("inputKeyBoard").onkeydown = editKeyUp;
}

function editKeyUp(e){
	document.getElementById("saveMessage").removeChild(node);
	upMove = e.keyCode
	node = document.createElement("h4");
	const textnode = document.createTextNode("The key "+ String.fromCharCode(upMove) + " saved.");
	node.appendChild(textnode);
	document.getElementById("saveMessage").appendChild(node);
	document.getElementById("saveMessage").style.display = "block";
	$("#inputKeyBoard").val('');

}

function chooseDownKeyBoard(){
	document.getElementById("editKey").style.display = "block";
	document.getElementById("inputKeyBoard").onkeydown = editKeyDown;
}

function editKeyDown(e){
	downMove = e.keyCode
	window.alert(downMove);
}
function chooseLeftKeyBoard(){
	document.getElementById("editKey").style.display = "block";
	document.getElementById("inputKeyBoard").onkeydown = editKeyLeft;
}

function editKeyLeft(e){
	leftMove = e.keyCode
}

function chooseRightKeyBoard(){
	document.getElementById("editKey").style.display = "block";
	document.getElementById("inputKeyBoard").onkeydown = editKeyRight;
}

function editKeyRight(e){
	rightMove = e.keyCode
}

