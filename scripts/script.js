// JavaScript Document

// Dice Game

// Global Variables
var $playerDice01Out = $('.player_output .dice_01_out span');
var $playerDice02Out = $('.player_output .dice_02_out span');
var $computerDice01Out = $('.computer_output .dice_01_out span');
var $computerDice02Out = $('.computer_output .dice_02_out span');
var $playerScoreRoundOut = $('.player_output .score_round span');
var $playerScoreTotalOut = $('.player_output .score_total span');
var $computerScoreRoundOut = $('.computer_output .score_round span'); 
var $computerScoreTotalOut = $('.computer_output .score_total span');
var $btnNewGame = $('.btn_new_game');
var $btnRollDice = $('.btn_roll_dice');
var playerTotalScore = 0;
var computerTotalScore = 0;
var diceHandsPlayed = 0;
var gameFinished = false;
var game = new Game();


game.init();

$btnNewGame.click(function(){
	game.init();		
});

$btnRollDice.click(function(){

	if(!gameFinished){
	  var thePlayerDice = game.rollDice();
	  var theComputerDice = game.rollDice();
	  var playerRoundScore = game.getDiceScore(thePlayerDice);
	  playerTotalScore = game.getTotalScore(playerRoundScore, playerTotalScore);
	  var computerRoundScore = game.getDiceScore(theComputerDice);
	  computerTotalScore = game.getTotalScore(computerRoundScore, computerTotalScore);
	  diceHandsPlayed = diceHandsPlayed + 2;
  
	  $playerDice01Out.text(thePlayerDice[0]);
	  $playerDice02Out.text(thePlayerDice[1]);
	  $computerDice01Out.text(theComputerDice[0]);
	  $computerDice02Out.text(theComputerDice[1]);
	  $playerScoreRoundOut.text(playerRoundScore);
	  $playerScoreTotalOut.text(playerTotalScore);
	  $computerScoreRoundOut.text(computerRoundScore);
	  $computerScoreTotalOut.text(computerTotalScore);		
	  
	  if(diceHandsPlayed === 6){
		  game.checkWin(playerTotalScore, computerTotalScore);
		  gameFinished = true;		
	  }
	}
	
});


// Game Object
function Game(){
	
	var die01;
	var die02;
	
	this.init = function(){
		$playerDice01Out.html('&nbsp;'); 
	  	$playerDice02Out.html('&nbsp;');  
	  	$computerDice01Out.html('&nbsp;');  
	  	$computerDice02Out.html('&nbsp;');  
	  	$playerScoreRoundOut.html('&nbsp;'); 
	  	$playerScoreTotalOut.html('&nbsp;');  
	  	$computerScoreRoundOut.html('&nbsp;');  
	  	$computerScoreTotalOut.html('&nbsp;');
		diceHandsPlayed = 0;
		playerTotalScore = 0;
		computerTotalScore = 0;
		gameFinished = false;  
	};
	
	this.rollDice = function(){
		die01 = Math.floor(Math.random()*6 + 1);
		die02 = Math.floor(Math.random()*6 + 1);
		return [die01, die02];
	};
	
	this.getDiceScore = function(rolledDice){
		var diceScore = 0;
		if(rolledDice[0] === 1 || rolledDice[1] === 1){
			diceScore = 0;
			return diceScore;	
		}else if(rolledDice[0] === rolledDice[1]){
			diceScore = (rolledDice[0] + rolledDice[1]) * 2;
			return diceScore;	
		}else{
			diceScore = rolledDice[0] + rolledDice[1];
			return diceScore;	
		}
	};  	
	
	this.getTotalScore = function(currentDiceScore, currentTotalScore){
			return currentDiceScore + currentTotalScore;
	};
	
	this.checkWin = function(playerScore, computerScore){
		if(playerScore > computerScore){
			alert('Player wins');	
		}else if(playerScore < computerScore){
			alert('Computer wins');	
		}else{
			alert('Player and Computer tied');	
		}	
	};	
	
}
