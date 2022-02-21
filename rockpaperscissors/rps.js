//rock paper scissors  
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

function psPrompt(){
    let ps = prompt("rock,paper, scissors?");
    let x = ps.toLowerCase()
    return x;
}

let count = 0;

function oneRound(playerSelection, computerSelection){
    // let playerSelection = "rock";       /*prompt("rock, paper, scissors?")*/
    // const playerSelection = playerSelectionCase.toLowerCase();
    // computerSelection = computerPlay(); 

    if (playerSelection == computerSelection){
        return ("Tie!");
        console.log ("Tie!");
    } else if (playerSelection == 'rock' && computerSelection == 'paper'){
        return ("You Lose!");
        console.log("You Lose!");
    } else if (playerSelection == 'rock' && computerSelection == 'scissors'){
        return ("You Win!");
        count ++; 
        return count;
        console.log("You Win!");
    } else if (playerSelection == 'paper' && computerSelection == 'scissors'){
        return ("You Lose!");
        console.log("You Lose!");
    } else if (playerSelection == 'paper' && computerSelection == 'rock'){
        return ("You Win!");
        count ++; 
        return count;
        console.log("You Win!");
    } else if (playerSelection == 'scissors' && computerSelection == 'rock'){
        return ("You Lose!");
        console.log("You Lose!");
    } else if (playerSelection == 'scissors' && computerSelection == 'paper'){
        return ("You Win!");
        count ++;
        return count;
        console.log("You Win!");
    }
}
                  
function game(count){

    for (let i = 0; i < 5; i++){ //(initial expression, condition, increment expression)
        oneRound('rock', computerPlay());
    }
        if (count >= 3){
        console.log("You Win!"); 
        } else if (count < 3){ 
        console.log("You Lose!");
        }
        
    }

    console.log(count);



// console.log(oneRound('rock', computerPlay()));
//  console.log(oneRound('rock', computerPlay()));
game();