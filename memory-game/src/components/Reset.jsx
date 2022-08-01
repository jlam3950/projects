import '../App.css';

const ResetBtn = (props) => {
    return (
        <button type = 'submit' className ='resetBtn' onClick = {() => {
            props.function(); 
        }}> RESET </button>
)
    }

export default ResetBtn;