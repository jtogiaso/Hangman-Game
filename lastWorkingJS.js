//Initializaing the arrays for the guesses
var incorrectGuessArray = [];
var rightGuessArray = [];
var hiddenWordArray = "-";

//
var numberOfGuessesLeft = 10;
var numberOfCorrectGuesses = 0;
var numberOfLosses = 0;
var numberOfWins = 0;

//Initializing a word array, to which the other arrays will be compared
var hangmanWord = "randomString";
var listOfRandomWords = ["apple" , "turtle" , "buzzard" , "pseudonym" , "dog" , "cat" , "turkey" , "drink", "thanks" , "fortune" , "serfdom" , "country" , "flirt" , "snag" , "computer"];

// capturing all of the elements we want to manipulate
var failedGuessCenter = document.getElementById("failedGuessCenter");
var hangmanPhrase = document.getElementById("hangmanPhrase");
var correctGuessCenter = document.getElementById("correctGuessCenter");
var instructionCenter = document.getElementById("instructionCenter");
var winLossCenter = document.getElementById("winLossCenter");
var numberOfLossesCenter = document.getElementById("numberOfLossesCenter");
var numberOfGuessesLeftCenter = document.getElementById("numberOfGuessesLeftCenter");


//Any key will "Start" the game by sending the "user" to the newWord function
document.onkeydown = function(letterKey) {
	console.log(letterKey);
	instructionCenter.textContent = "Have Fun! Press letter keys to guess the letters of the word!";
	newWord();	
}

//Re-initalizes all appropriate variables. If the user were to restart the game, each variable will be re-intialized upon this function being recalled
function newWord () {
	hangmanWord = listOfRandomWords[getRandomInt(0 , listOfRandomWords.length - 1)];
	hiddenWordArray = [];
	for (var i = 0; i < hangmanWord.length; i++){
		hiddenWordArray += "-";
	}
	hangmanPhrase.textContent = hiddenWordArray;
	incorrectGuessArray = [];
	failedGuessCenter.textContent = "You have no guesses at all!";
	rightGuessArray = [];
	correctGuessCenter.textContent = "You have not correctly guessed anything!";
	numberOfGuessesLeft = 10;
	numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + numberOfGuessesLeft;
	numberOfCorrectGuesses = 0;
	gameLogic();

}


//Function where the actual gaming guess logic takes place
//Also moves the onkeyup element to this function
function gameLogic () {	

	document.onkeydown = function(keyPress) {
		console.log(keyPress);

		if (hangmanWord.indexOf(keyPress.key) === -1) {
			if (incorrectGuessArray.indexOf(keyPress.key) === -1 && keyPress.keyCode >= 65 && keyPress.keyCode <= 90) {
				incorrectGuessArray.push(keyPress.key);
				incorrectGuessArray = incorrectGuessArray.join(" ");
				failedGuessCenter.textContent = incorrectGuessArray;
				incorrectGuessArray = incorrectGuessArray.split("");
				numberOfGuessesLeft--;
				numberOfGuessesLeftCenter.textContent = "Number of guesses left: " + numberOfGuessesLeft;
			}
		}
		else {
			if (rightGuessArray.indexOf(keyPress.key) === -1) {
				rightGuessArray.push(keyPress.key);
				rightGuessArray = rightGuessArray.join(" ");
				correctGuessCenter.textContent = rightGuessArray;
				rightGuessArray = rightGuessArray.split("");
				for (var i = 0; i < hangmanWord.length; i++) {
					if (keyPress.key === hangmanWord[i]) {
						hiddenWordArray = hiddenWordArray.split("");
						hiddenWordArray[i] = keyPress.key;
						hiddenWordArray = hiddenWordArray.join("");
						numberOfCorrectGuesses++;
					}
				}
				hangmanPhrase.textContent = hiddenWordArray;
			}	
		}

		if (keyPress.key === "Escape" || numberOfGuessesLeft === 0) {
			numberOfGuessesLeftCenter.textContent = "No guesses remain!";
			getOutOfOriginalOnKeyUpLose();
		}
		if (numberOfCorrectGuesses === hangmanWord.length) {
			getOutOfOriginalOnKeyUpWin();
		}
	}
}

//If user loses, this function will be called and only pressing "Enter" will return user to the game. Also, number of losses is incremeneted.
//Also moves the onkeyup element to this function in order to break 
function getOutOfOriginalOnKeyUpLose () {
	document.onkeydown = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Have Fun! Press letter keys to guess the letters of the word!";
			newWord();
		}

	}
	instructionCenter.textContent = "You Lost! The word was: " + hangmanWord + ". Press Enter to start over!";
	numberOfLosses++;
	winLossCenter.textContent = numberOfWins + " - " + numberOfLosses;

}

//If user wins, this function will be called. Instruction center div will also display a winning message
function getOutOfOriginalOnKeyUpWin () {
	document.onkeydown = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Have Fun! Press letter keys to guess the letters of the word!";
			newWord();
		}
	}
	instructionCenter.textContent = "You win! Bet you can't do it again! Press Enter to start over!";
	numberOfWins++;
	winLossCenter.textContent = numberOfWins + " - " + numberOfLosses;

}

//Generate random integer between the provided the paramaters
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}