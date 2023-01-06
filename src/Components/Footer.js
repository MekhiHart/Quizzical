export default function Footer(props){
    return(
        <div className="footer">
            {props.quizEnded && <h3>You scored {props.quizPoints} / {props.quizTotal} correct answers </h3> }
            <button 
            className="footer-button"
            onClick={props.handleClick}
            >{props.quizEnded ?  "Play Again": "Check Answers"}</button>
        </div>
    )
}