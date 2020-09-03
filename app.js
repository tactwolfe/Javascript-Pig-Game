/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores , roundScore, activePlayer, gamePlaying= true;
var lastDice;
var winningScore
initFunction();

document.querySelector('.btn-roll').addEventListener( 'click' , function(){

    if(gamePlaying) {
        //random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Dsiplay the result
        document.getElementById('.dice-1').style.display = 'block'; //to make the dice visible when one of the player rolls the dice
        document.getElementById('.dice-2').style.display = 'block'; //to make the dice visible when one of the player rolls the dice
       
        document.getElementById('.dice-1').src = 'dice-'+dice1+'.png';
        document.getElementById('.dice-2').src = 'dice-'+dice2+'.png';

        //update the round score if the rolled number was NOT 1
        if(dice === 6 && lastDice === 6){
            scores[activePlayer] = 0;
            //update the UI
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
        }
        else if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        else{
            //next player
            nextPlayer();
            
        }

        lastDice = dice;
    }
 
});

document.querySelector('.btn-hold').addEventListener('click', function(){ //button to hold the player score

    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore ; 

        //update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;

        //undefine , 0 ,null , "" are COERCED to false
        //anything else is COERCED to true
        if(input){
             winningScore = input;
        }
        else{
            winningScore = 100;
        }
        
        //check if player win the game
        if(scores[activePlayer] >= winningScore ){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false; 
        }
        else{
            nextPlayer();
        }
    }



});

document.querySelector('.btn-new').addEventListener('click', initFunction); // button to start new game

//function the toggle the next player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0; //round score reset to zero for next player

        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'

        // document.querySelector('.player-0-panel').classList.remove('active'); //remove class active
        // document.querySelector('.player-1-panel').classList.add('active'); //add class active

        document.querySelector('.player-0-panel').classList.toggle('active'); //toggle class active
        document.querySelector('.player-1-panel').classList.toggle('active'); //toggle class active

        document.getElementById('.dice-1').style.display = 'none'; //to hide the dice till the next player rolls the dice
        document.getElementById('.dice-2').style.display = 'none'; //to hide the dice till the next player rolls the dice
    
}

//our init function that reset our game
function initFunction() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

// document.querySelector('#current-' + activePlayer).textContent = dice; //its a setter cause we set a value
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>'; //if we want to pass some html code along with the text we use innerHTML instead of textcontent


// var x = document.querySelector('#score-1').textContent; // to read the variable its a getter
// console.log(x);

document.getElementById('.dice-1').style.display = 'none'; //using the queryselector to change the css of html element
document.getElementById('.dice-2').style.display = 'none'; //using the queryselector to change the css of html element

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}
