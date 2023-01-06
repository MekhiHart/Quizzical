import {useState,useEffect} from "react"
import StartingScreen from "./Components/StartingScreen"
import QuizScreen from "./Components/QuizScreen"
// import logo from './logo.svg';

import './App.css';
import logo from "./Images/splash.png"



function App() {
  
  const [quizCreated, setQuizCreated] = useState(false) // ! Original state = false
  const [quizEnded, setQuizEnded] = useState(false)

  const [restartQuiz,setRestartQuiz] = useState(false)
  

  function handleQuizEnded(){ // ! Located at footer component
    setQuizEnded(prevState => !prevState)

    if(quizEnded){ 
      setRestartQuiz(prevState => !prevState) // ! Restart quiz is place as a dependency array to restart quiz
    }
  }


  function handleQuizCreated(){
    setQuizCreated(prevState => !prevState)
  }

  return (
    <main>
        {quizCreated ? 
        <QuizScreen quizEnded={quizEnded} handleClick={handleQuizEnded} isQuizRestarted={restartQuiz} /> : 
        <StartingScreen logo={logo} handleClick={handleQuizCreated}/>}
    </main>
  );
}

export default App;
