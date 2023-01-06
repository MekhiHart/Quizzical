import {nanoid} from "nanoid"
export default function Question(props){

    const question = props.data.question
    const questionKey = props.data.id

    

    // * Render Button

    const buttons = props.data.buttons.map(button => {
    
        let buttonStyle ={
            background: button.isSelected ? "#D6DBF5" : "none",
            borderRadius: "7.94239px",
            border:button.isSelected ? "none" : "0.794239px solid #4D5B9E",

            display: "flex",
            padding: "10px 20px",
            marginRight: "20px",
            marginBottom: "10px",
            outline: "none",
          
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight:"500",
            fontSize: "10.24px",
            lineHeight: "12px",
            textAlign: "center",
        }

        if(!props.quizEnded){
            
            buttonStyle.background = button.isSelected ? "#D6DBF5" : "none"
        }
        else {
            if(button.isCorrect) buttonStyle.background = "#94D7A2"
            else if(button.isSelected && !button.isCorrect) buttonStyle.background = "#F8BCBC"
        }


    
        return (
        <button 
        key={button.id}
        onClick={() => props.selectButton(questionKey,button.id)}
        style={buttonStyle}
        >{button.value}</button> )})



    return(
        <div className="question">
            <h1>{question}</h1>
            <div className="answers">
                {buttons}
            </div>
            <div className="break-line"/>
        </div>
        
    )
}