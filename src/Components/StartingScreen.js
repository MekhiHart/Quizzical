import React from "react"

export default function StartingScreen(props){

    return(
        
        <div className="starting-div">
            <img className="start-logo" src={props.logo}/>
            <h1>Quizzical</h1>
            <p>Anime quizes!</p>
            <button 
            className="createQuiz-btn" 
            onClick={props.handleClick}> Start Quiz </button>
        </div>
        
    )
}