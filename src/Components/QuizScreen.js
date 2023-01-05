import React, {useState,useEffect} from "react";
import Question from "./Question"
import {nanoid} from "nanoid"

export default function Quiz(props){

    const [questionsObjArray, setQuestionsObjArray] = useState([])

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&encode=base64")
        .then(res => res.json())
        .then(data => setQuestionsObjArray(transformData(data))) // ! Use atob() to decode data

    },[]) // * useEffect

    console.log(questionsObjArray)

    
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
                id: nanoid(),
                button: buttonsObjArray
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
        <Question/>
    )
}