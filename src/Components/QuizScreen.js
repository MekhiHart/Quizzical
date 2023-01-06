import React, {useState,useEffect} from "react";
import Question from "./Question"
import Footer from "./Footer"
import {nanoid} from "nanoid"

export default function QuizScreen(props){

    const [questionsObjArray, setQuestionsObjArray] = useState([])
    const [quizPoints, setQuizPoints] = useState(0)


    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&encode=base64")
        .then(res => res.json())
        .then(data => setQuestionsObjArray(transformData(data))) // ! Use atob() to decode data
    },[props.isQuizRestarted]) // * useEffect

    const questionComponents = questionsObjArray.map(questionObj => (
        <Question 
        id={questionObj.id}
        key={questionObj.id}
        data={questionObj}
        selectButton={selectButton} // * Function
        quizEnded={props.quizEnded}
        />))

    // * Interactive functions
    console.log("Quiz State", props.quizEnded)

    function selectButton(questionId, buttonId){ // ! Fuct this func lmao

        if (!props.quizEnded){
            setQuestionsObjArray(prevState=>{
                let returnArray // ! Contains array of objects
                returnArray = prevState.map(questionObj =>{
                    if(questionObj.id === questionId ){ // * If the question component is what the user clicked
                        return{
                            ...questionObj,
                            buttons: questionObj.buttons.map(button =>({
                                ...button,
                                isSelected: buttonId === button.id
                            }))
                        }
                    }
    
                    else return questionObj // * If the question component is not the user clicked
                     // *temp
                })
    
               setQuizPoints( HandleQuizPoints(returnArray)) // ! Sets points
                // returnButtonProps(questionId,buttonId,returnArray)
                return returnArray // * New Array with button isSelected
            })

        }
    }// *selectButton()
    
    // * Interactive functions

    function HandleQuizPoints(arr){ // ! Fuct this func lmao
        let local_quizPoints = 0
        arr.forEach(questionObj =>{
            questionObj.buttons.forEach(button => {
                if(button.isSelected && button.isCorrect) local_quizPoints++
            })
        })
        return local_quizPoints
    }


    

    function transformData(data){ // ! For data.result
        const results = data.results

        let returnArray = results.map(questionObj =>{
            let possibleAnswers = [questionObj.correct_answer, ...questionObj.incorrect_answers]
            possibleAnswers = devodeValues(possibleAnswers)
            possibleAnswers = shuffleArray(possibleAnswers)

            let buttonsObjArray = possibleAnswers.map(answer =>({
                value: answer,
                isSelected: false,
                isCorrect: answer === atob(questionObj.correct_answer),
                id: nanoid()
            }))

            questionObj = {
                question: atob(questionObj.question),
                buttons: buttonsObjArray,
                id:nanoid()
            }
            return questionObj
        })

        return returnArray
    } // * transformQUestionObjArray

    function devodeValues(arr){
        let decodedArray = arr.map(val => atob(val))
        return decodedArray
    } // * decodeValues


    function shuffleArray(arr){
        let returnArray = [...arr]
   
        for (let i=0; i<5;i++){
            let randomIdx_1 = Math.floor(Math.random() * arr.length ) 
            let randomIdx_2 = Math.floor(Math.random() * arr.length ) 
            let temp_1 = returnArray[randomIdx_1]
            let temp_2 = returnArray[randomIdx_2]

            returnArray[randomIdx_1] = temp_2
            returnArray[randomIdx_2] = temp_1
        }
        
        return returnArray

    } //* shuffleArray

    return(
        <div className="quiz-screen">
            {questionComponents}
            <Footer handleClick={props.handleClick} 
            quizEnded={props.quizEnded}
            quizPoints={quizPoints}
            quizTotal={questionsObjArray.length}
            />
        </div>
    )
}