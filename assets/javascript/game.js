var incorrectGuessArray = [];
var rightGuessArray = [];
var hiddenWordArray = "-";

var numberOfFailedGuesses = 0;
var numberOfCorrectGuesses = 0;
var numberOfLosses = 0;
var numberOfWins = 0;

var hangmanWord = "randomString";
var listOfRandomWords = ["pseudonym" , "dog" , "cat" , "turkey" , "drink", "thanks" , "fortune" , "serfdom" , "country" , "flirt" , "snag" , "computer"];

var failedGuessCenter = document.getElementById("failedGuessCenter");
var hangmanPhrase = document.getElementById("hangmanPhrase");
var correctGuessCenter = document.getElementById("correctGuessCenter");
var instructionCenter = document.getElementById("instructionCenter");
var numberOfWinsCenter = document.getElementById("numberOfWinsCenter");
var numberOfLossesCenter = document.getElementById("numberOfLossesCenter");
var numberOfGuessesLeft = 0;



document.onkeyup = function(letterKey) {
	// if (letterKey.key === "Enter") {
		instructionCenter.textContent = "Have Fun!";
		newWord();	
	// }
}

function newWord () {
	hangmanWord = listOfRandomWords[getRandomInt(0 , listOfRandomWords.length)];
	hiddenWordArray = [];
	for (var i = 0; i < hangmanWord.length; i++){
		hiddenWordArray += "-";
	}
	document.onkeyup = function(keyPress) {};
	hangmanPhrase.textContent = hiddenWordArray;
	incorrectGuessArray = [];
	failedGuessCenter.textContent = incorrectGuessArray;
	rightGuessArray = [];
	correctGuessCenter.textContent = rightGuessArray;
	numberOfFailedGuesses = 0;
	numberOfCorrectGuesses = 0;
	numberOfLosses = 0;
	numberOfWins = 0;
	numberOfGuessesLeft = 0;
	gameLogic();

}

function gameLogic () {	

	document.onkeyup = function(keyPress) {
		console.log(keyPress);

		if (hangmanWord.indexOf(keyPress.key) === -1) {
			if (incorrectGuessArray.indexOf(keyPress.key) === -1 && keyPress.keyCode > 64 && keyPress.keyCode < 91) {
				incorrectGuessArray.push(keyPress.key);
				failedGuessCenter.textContent = incorrectGuessArray;
				numberOfFailedGuesses++;
			}
		}
		else {
			if (rightGuessArray.indexOf(keyPress.key) === -1) {
				rightGuessArray.push(keyPress.key);
				correctGuessCenter.textContent = rightGuessArray;
				hiddenWordArray = hiddenWordArray.split("");
				hiddenWordArray[hangmanWord.indexOf(keyPress.key)] = keyPress.key;
				hiddenWordArray = hiddenWordArray.join("");
				hangmanPhrase.textContent = hiddenWordArray;
				numberOfCorrectGuesses++;
			}	
		}

		if (keyPress.key === "Escape" || numberOfFailedGuesses === 5) {
			getOutOfOriginalOnKeyUpLose();
		}
		if (numberOfCorrectGuesses === hangmanWord.length) {
			getOutOfOriginalOnKeyUpWin();
		}
	}
}

function getOutOfOriginalOnKeyUpLose () {
	document.onkeyup = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Have Fun!";
			newWord();
		}

	}
	instructionCenter.textContent = "You Lost! Press Enter to begin again!";
	numberOfLosses++;
	numberOfLossesCenter.textContent = "Number of Losses: " + numberOfLosses;

}

function getOutOfOriginalOnKeyUpWin () {
	document.onkeyup = function(pressedKey) {
		console.log("You pressed this button: " + pressedKey.key);
		if (pressedKey.key === "Enter") {
			instructionCenter.textContent = "Have Fun!";
			newWord();
		}
	}
	instructionCenter.textContent = "You win! Bet you can't do it again! Press Enter to begin again!";
	numberOfWins++;
	numberOfWinsCenter.textContent = "Number of Wins: " + numberOfWins;

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}