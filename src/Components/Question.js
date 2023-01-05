export default function Question(props){

    const answersButtonsArray = props.answer.possibleAnswers.map(item => (
        <button>{item}</button>
    ))



    console.log(answersButtonsArray)

    return(
        <div className="question">
            <h1>{props.question}</h1>
            <div className="answers">
                {answersButtonsArray}
            </div>
        </div>
    )
}