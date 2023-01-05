import React, {useState,useEffect} from "react";
import Question from "./Question"

export default function Quiz(props){
    const [questionsArrayObj, setQuestionsArrayObj] = useState([])

    // useEffect(()=>{
    //     fetch("https://opentdb.com/api.php?amount=5&category=31")
    //     .then(res => res.json())
    //     .then(data => setQuestionsArrayObj(data.results))
    //     // .then(ret => JSON.stringify(ret))
        
        
    // },[])

    
    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=31&encode=base64")
        .then(res => res.json())
        .then(data => setQuestionsArrayObj(data.results))
        

    },[])

    


    const questionsArray = questionsArrayObj.map(obj =>  atob(obj.question) )
    const answersArrayObj = questionsArrayObj.map(obj => {
        let possibleAnswersArray = [obj.correct_answer, ...obj.incorrect_answers]
        let incorrectAnswersArray = obj.incorrect_answers.map(item => atob(item))
        possibleAnswersArray = possibleAnswersArray.map(item => atob(item))
        possibleAnswersArray = shuffleArray(possibleAnswersArray)

        let returnObj = {
            correct_answer: atob(obj.correct_answer),
            incorrect_answers: incorrectAnswersArray,
            possibleAnswers: possibleAnswersArray
        }
        return returnObj
    })

    const questionComponents = createQuestionComponents(questionsArray,answersArrayObj)


    function createQuestionComponents(qArray,answerArrayObj){
        let returnArray = []
        for (let i=0; i<qArray.length;i++){
            returnArray.push(<Question
            question={qArray[i]}
            answer={answerArrayObj[i]}
            />)
        }
        return returnArray
    }


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

    }

    return(
        questionComponents
    )
}