
//DOM Buttons

const container = document.querySelector('#container');
const content = document.createElement('paragraph');
content.classList.add('report');
const win = document.querySelector("#winner");
win.classList.add('winbox')
let userScore = document.querySelector('#userscore');
let computerScore = document.querySelector('#computerscore');


const rockbtn = document.querySelector('#rock'); 
rockbtn.addEventListener("click", rockSelection);

const paperbtn = document.querySelector('#paper');
paperbtn.addEventListener("click", paperSelection);

const scissorbtn = document.querySelector('#scissors'); 
scissorbtn.addEventListener("click", scissorSelection);

//choice functions
function rockSelection(){
    content.textContent = (oneRound("rock", computerPlay()));
    container.appendChild(content);
    endGame();
}

function paperSelection(){
    content.textContent = (oneRound("paper", computerPlay()));
    container.appendChild(content);
    endGame();
}

function scissorSelection(){
    content.textContent = (oneRound("scissors", computerPlay()));
    container.appendChild(content);
    endGame();
}

function computerPlay(){
    let random = Math.floor(Math.random() * 3);

    if (random == 0){
        return ('rock');
    } else if (random == 1){
        return ('paper');
    } else if (random == 2){
        return ('scissors');
    }
    return random; 
}

let counter = {
    player: 0,
    cpu: 0
};

document.getElementById("userscore").innerHTML = counter.player;
document.getElementById("computerscore").innerHTML = counter.cpu; 

//reseting the score if the conditions are met
function reset(){
    if (win.innerHTML ="You Win! Play Again?"){
        userScore.textContent = 0; //If I don't have this, it won't set the score to zero. 
        computerScore.textContent = 0; //If I don't have this, it won't set the score to zero. 
        counter.player = 0;
        counter.cpu = 0;
        win.innerHTML = "";
        content.textContent = "";
    } else if (win.innerHTML="You Lose! Try Again!"){
        userScore.textContent = 0;
        computerScore.textContent = 0;
        counter.player = 0;
        counter.cpu = 0;
        win.innerHTML = "";
        content.textContent = "";
    }
}

function oneRound(playerSelection, computerSelection){

    if (playerSelection == computerSelection){
        return (" Computer made the same selection. Tie!"); //function ends if using the return statement 
    } else if (playerSelection == 'rock' && computerSelection == 'paper'){
        computerScore.textContent = counter.cpu +=1;
        return ("Computer selected paper. You Lose!");
    } else if (playerSelection == 'rock' && computerSelection == 'scissors'){
        userScore.textContent = counter.player +=1;
        return ("Computer selected scissors. You Win!");
    } else if (playerSelection == 'paper' && computerSelection == 'scissors'){
        computerScore.textContent = counter.cpu +=1;
        return ("Computer selected scissors. You Lose!");
    } else if (playerSelection == 'paper' && computerSelection == 'rock'){
        userScore.textContent = counter.player +=1;
        return ("Computer selected rock. You Win!");
    } else if (playerSelection == 'scissors' && computerSelection == 'rock'){
        computerScore.textContent = counter.cpu +=1;
        return ("Computer selected rock. You Lose!");
    } else if (playerSelection == 'scissors' && computerSelection == 'paper'){
        userScore.textContent = counter.player +=1;
        return ("Computer selected paper. You Win!");
    }
}

function endGame(){
    if(counter.player >= 5){
        win.innerHTML = "You Win! Play Again?";
        alert("You Win! Want to play again?");
        reset();
    } else if (counter.cpu >= 5){   
        win.innerHTML = "You Lose! Try Again!";
        alert("You Lose! Don't give up yet!");
        reset();
        // return;
    }
}



// console.log(totalComputerScore);

// 