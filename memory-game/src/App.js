import './App.css';
import MemoryCard from './components/MemoryCard';
import UpdateScore from './components/Score';
import ResetBtn from './components/Reset'
import { useState, useEffect } from 'react';
let newDeck;
let points = 0; 

function App() {
const [deck, setDeck] = useState([]);
const [pickedCards, setPickedCards] = useState([]);

const generateDeck = () =>{
  points = 0;
  newDeck = [];
  const symbols = [ '△','ß','£','§','•','$','+','ø']; 
  for(let i = 0; i < 16; i++){
    newDeck.push({
      isFlipped: false,
      symbol: symbols[i % 8]
    })
  }
  shuffle(newDeck);
  setDeck(newDeck);
}

const shuffle = (deck) => {
 for(let i = 0; i < deck.length; i++){
   let a = Math.floor(Math.random() * i);
   let b = Math.floor(Math.random() * i);
   let tmp = deck[a];
   deck[a] = deck[b];
   deck[b] = tmp;
 }
 return deck;
}

  useEffect(()=> {
    generateDeck();
  },[])

  const unFlipCards = (card1Index, card2Index) => {
    let card1 = {...deck[card1Index]};
    let card2 = {...deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;

    let newDeck = deck.map((card, index) =>{
        if(index === card1Index){
          return card1;
        }
        if(index === card2Index){
          return card2;
        }
        return card;
    })
    setDeck(newDeck);
  }


  const pickCard = (cardIndex) =>{
    if(deck[cardIndex].isFlipped) {
      return;
    } 
    let cardToFlip = {...deck[cardIndex]};
    cardToFlip.isFlipped = true; 
    let newPickedCards = pickedCards.concat(cardIndex);
    console.log(newPickedCards)
    let newDeck = deck.map((card,index) => {
        if(cardIndex === index){
          return cardToFlip;
    }
        return card; 

    })

    if(newPickedCards.length === 2){
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      if(newDeck[card1Index].symbol !== newDeck[card2Index].symbol){
        setTimeout(unFlipCards.bind(unFlipCards, card1Index, card2Index), 1000);
        points -= 50;
      }
      if(newDeck[card1Index].symbol == newDeck[card2Index].symbol){
        points += 100;
      }

      newPickedCards = [];
    }

    setDeck(newDeck);
    setPickedCards(newPickedCards);
  }

let cardsJSX = deck.map((card,index) => {
  return <MemoryCard key = {index} symbol={card.symbol} isFlipped={card.isFlipped} 
  pickCard = {pickCard.bind(pickCard,index)}/>
})
  
  return (
    <div className="App">
      <header className="App-header">
        <h1> Concentration </h1>
        {/* 🦆 */}
        <h3 className = 'App-subheader'>Match Cards to Win</h3>
      </header>
      <body className = 'App-body'>
        <div className = 'cardContainer' >
          <div className = 'grid'>
            <div>{cardsJSX.slice(0,4)}</div>
            <div>{cardsJSX.slice(4,8)}</div>
            <div>{cardsJSX.slice(8,12)}</div>
            <div>{cardsJSX.slice(12,16)}</div>
          </div>
        </div>
        <div className = 'score'> 
          Score:
          <UpdateScore score= {points}/>
        </div>
          <ResetBtn score= {points} function ={generateDeck} />
      </body>
    </div>
  );
}

export default App;
