import "../App.css"
// import { useState } from 'react';

let hiScore = 0;

const UpdateScore = (props) => {
    return (  
        <div className = 'scoreContainer'>
            <p className = {props.score >= 0 ? 'scoreColor-green' : 'scoreColor-red'} >{props.score}</p>
        </div>
    );
}
 
export default UpdateScore;