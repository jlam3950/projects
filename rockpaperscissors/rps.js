
//DOM Buttons

const container = document.querySelector('#container');
const content = document.createElement('paragraph');
content.classList.add('report');
const userScore = document.querySelector('#userscore');
const computerScore = document.querySelector('#computerscore');

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
}

function paperSelection(){
    content.textContent = (oneRound("paper", computerPlay()));
    container.appendChild(content);
}

function scissorSelection(){
    content.textContent = (oneRound("scissors", computerPlay()));
    container.appendChild(content);
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

let p1 = counter.player;
let p2 = counter.cpu;


function oneRound(playerSelection, computerSelection){

    if (playerSelection == computerSelection){
        return (" Computer made the same selection. Tie!");
        console.log(p1);
        console.log ("Tie!");
    } else if (playerSelection == 'rock' && computerSelection == 'paper'){
        computerScore.textContent = counter.cpu ++;
        return ("Computer selected paper. You Lose!");
    } else if (playerSelection == 'rock' && computerSelection == 'scissors'){
        userScore.textContent = counter.player +=1;
        console.log(counter.player);
        return ("Computer selected scissors. You Win!");
    } else if (playerSelection == 'paper' && computerSelection == 'scissors'){
        computerScore.textContent = counter.cpu ++;
        return ("Computer selected scissors. You Lose!");
    } else if (playerSelection == 'paper' && computerSelection == 'rock'){
        userScore.textContent = counter.player +=1;
        return ("Computer selected rock. You Win!");
    } else if (playerSelection == 'scissors' && computerSelection == 'rock'){
        computerScore.textContent = counter.cpu ++;
        return ("Computer selected rock. You Lose!");
    } else if (playerSelection == 'scissors' && computerSelection == 'paper'){
        userScore.textContent = counter.player +=1;
        return ("Computer selected paper. You Win!");
    }

}


document.getElementById("userscore").innerHTML = counter.player;
document.getElementById("computerscore").innerHTML = counter.cpu;

// function endGame(x,y){
//     if (x === 5){
//         return ("You Win!");
//     } else if (y ===5){
//         console.log("You Lose!");
//     }
// };

// function endGame(p1,p2);