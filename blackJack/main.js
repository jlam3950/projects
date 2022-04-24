window.addEventListener('DOMContentLoaded', function() {
})

window.onload = function(){
  buildDeck();
}

let dealBtn = document.querySelector('#deal-button');
let hitBtn = document.querySelector('#hit-button');
let stdBtn = document.querySelector('#stand-button'); 
let dealerHand = document.querySelector('#dealer-hand');
let playerHand = document.querySelector('#player-hand');
let playerPoints = document.querySelector('#player-points');
let dealerPoints = document.querySelector('#dealer-points');
let messageBox = document.querySelector('#messages');
let playerScore = 0;
let dealerScore = 0;
const deck = [];
let dealerDeck = [];
let playerDeck = [];
// let hitFlag = false; 
const rank = [2,3,4,5,6,7,8,9,10]; //need to add face cards
const suit = ['hearts','diamonds','spades','clubs'];

//BuildDeck - returns a new array with 52 card objects
function buildDeck (){
  for (let i = 0; i < rank.length; i++ ){
    for (let j = 0; j < suit.length; j++){
      let card = {rank: rank[i], suit: suit[j]} 
      deck.push(card);
      shuffle(deck); 
    }
  }
  console.log(deck);//Need to add the ace  
}

// function buildDeck (){
//   for (let i = 0; i < rank.length; i++ ){
//     for (let j = 0; j < suit.length; j++){
//       let card = {rank: rank[i], suit: suit[j]} 
//       deck.push(card);
//       shuffle(deck); 
//     }
//   }
//   console.log(deck);//Need to add the ace  
// }

//Shuffle 
function shuffle(){ 
  for (let i = 0; i <deck.length; i++){
    let a = Math.floor((Math.random() * deck.length)); 
    let b = Math.floor((Math.random() * deck.length));
    let tmp = deck[a];
    deck[a] = deck[b];
    deck[b] = tmp; 
  }
}

//Deals Card, Starts Game

// Calculate Points 
// Takes in an array of card objects, and converts this into points 
function calculatePoints(deck, userScore, points){
  for (let i = 0; i < deck.length; i++){
    userScore += deck[i].rank;
    // playerScore += deck[i].rank;
  }
  points.innerText = userScore;
  
  if (playerPoints.innerHTML > 21){
    messageBox.innerText = "BUST DETECTED, ending game :'(";

    setTimeout(() =>{
      resetGame()
    },3000)
  }
 
  return userScore;
}

function dealCard() {
  dealBtn.disabled = true; 

  for (let i = 0; i < 4; i++) {
    // get a card from the deck
    let deckCard = deck.pop();
    // create image tag
    let card = document.createElement("img");
    // set the card image by the card attributes
    card.setAttribute("src", `images/${deckCard.rank}_of_${deckCard.suit}.png`);

    if (i % 2 == 0) {
      playerDeck.push(deckCard);
      playerHand.appendChild(card);
      console.log(playerDeck);
    } else {
      dealerDeck.push(deckCard);
      dealerHand.appendChild(card);
      console.log(dealerDeck);
    }
  }
  calculatePoints(playerDeck, playerScore, playerPoints);
  calculatePoints(dealerDeck, dealerScore, dealerPoints);
}

function hitMe(){
  let deckCard2 = deck.pop();
  let card = document.createElement('img');
  card.setAttribute("src", `/images/${deckCard2.rank}_of_${deckCard2.suit}.png`);
  // if (hitFlag == false){
    playerDeck.push(deckCard2);
    playerHand.appendChild(card);
    calculatePoints(playerDeck, playerScore, playerPoints);
    // hitFlag = true;
    return;
  // } 
  // if (hitFlag == true){
  //   dealerDeck.push(deckCard2);
  //   dealerHand.appendChild(card);
  //   calculatePoints(dealerDeck, dealerScore, dealerPoints);
  //   hitFlag = false;
  //   return;
  // }
}

function stand(){

  while (dealerPoints.innerHTML < 17){
    if (dealerPoints.innerHTML > 21){
      messageBox.innerText = "Computer busted. You Win!";
    } 

    let deckCard3 = deck.pop();
    let card = document.createElement('img');
    card.setAttribute("src", `/images/${deckCard3.rank}_of_${deckCard3.suit}.png`);
    dealerDeck.push(deckCard3);
    dealerHand.appendChild(card);
    calculatePoints(dealerDeck, dealerScore, dealerPoints);


  } 
  
  if (dealerPoints.innerHTML > 21){
    messageBox.innerText = "Computer busted. You Win!";
  } 
    determineWinner();
}

function determineWinner(){
  dealBtn.disabled = true; 
  hitBtn.disabled = true; 
  stdBtn.disabled = true; 
  
  if (playerPoints.innerHTML > dealerPoints.innerHTML){
    messageBox.innerText = "You Win!";
  } else if (dealerPoints.innerHTML < 21 && dealerPoints.innerHTML > playerPoints.innerHTML){
    messageBox.innerText = "You Lose!";
  } else if (playerPoints.innerHTML == dealerPoints.innerHTML){
    messageBox.innerText = "Tie";
  }

  setTimeout(() =>{
    resetGame()
  },3000)
}

function resetGame(){
  playerPoints.innerHTML = 0;
  dealerPoints.innerHTML = 0;
  playerHand.innerHTML = '';
  dealerHand.innerHTML = '';
  messageBox.innerText = '';
  dealerDeck = [];
  playerDeck = [];

  dealBtn.disabled = false; 
  hitBtn.disabled = false; 
  stdBtn.disabled = false; 
  shuffle();
  console.log(playerPoints.innerHTML)
}

dealBtn.addEventListener('click', dealCard); 
hitBtn.addEventListener('click', hitMe); 
stdBtn.addEventListener('click', stand);