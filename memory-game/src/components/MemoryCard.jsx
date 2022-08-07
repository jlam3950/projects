import "./MemoryCard.css"
import DClogo from '../dcLogo.png'
import whiteDuck from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/whiteDuck.jpg'
import angryDuck from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/angryDuck.jpg'
import cockatoo from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/cockatoo.jpg'
import goose from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/gooseLoose.jpg'
import macaw from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/macaw.jpg'
import woodpecker from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/woodpecker.jpg'
import owl from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/owl.jpg'
import hawk from '/Users/Jeff/Desktop/personalprojects/Projects/memory-game/src/cardImages/hawk.jpg'

const MemoryCard = (props) => {
    const renderImage = (icon) => {
        switch(icon){
            case '△':
                 return whiteDuck;
            case 'ß':
                 return angryDuck;
            case '£':
                 return cockatoo;
            case '§':
                 return goose;
            case '•':
                 return macaw;
            case '$':
                 return woodpecker;
            case '+':
                 return owl;
            case 'ø':
                 return hawk;
            default: 
                 console.log('no more birds')
        }
    
    }

    return(
        <div className = 'MemoryCard' onClick = { props.pickCard }>
            <div className = { props.isFlipped ? 'MemoryCardInner flipped' : 'MemoryCardInner'}> 
                <div className = 'MemoryCardBack'>
                    <img className = 'MemoryCardImg' src = { DClogo } alt ='logo' />
                </div>
                <div className = 'MemoryCardFront'>
                {/* {props.symbol} */}
                    <img src = {renderImage(props.symbol)} width ='100%' height = '100%' alt ='birdCard'></img>
                </div>     
            </div>
        </div>
    )
}

export default MemoryCard;