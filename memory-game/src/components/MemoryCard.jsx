import "./MemoryCard.css"
import DClogo from '../dcLogo.png'


const MemoryCard = () => {
   
    return(
        <div className = 'MemoryCard'>
                <img className = 'MemoryCardImg' src = { DClogo } alt ='logo' />
        </div>
    )

    
}

export default MemoryCard;