import "./MemoryCard.css"
import DClogo from '../dcLogo.png'
import { useState } from 'react';


const MemoryCard = (props) => {
const [isFlipped, setFlip] = useState(false)
   
    // const clickHandler = () =>{
    //     setFlip(!isFlipped);
    // }
   

    return(
        <div className = 'MemoryCard' onClick = { props.pickCard }>
            <div className = { props.isFlipped ? 'MemoryCardInner flipped' : 'MemoryCardInner'}> 
            {/* just changed 15 to props.symbol */}
                <div className = 'MemoryCardBack'>
                    <img className = 'MemoryCardImg' src = { DClogo } alt ='logo' />
                </div>
                <div className = 'MemoryCardFront'>
                {props.symbol}
                </div>     
            </div>
        </div>
    )
}

export default MemoryCard;

// useState returns the current state, and the function to update the state 
// const [isFlipped, set Flip]. destructured. isFlipped is the current state while setFlip is the function
//useState looks to demonstrate the current state