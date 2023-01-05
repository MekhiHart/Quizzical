import {useState,useEffect} from "react"
import StartingScreen from "./Components/StartingScreen"
import QuizScreen from "./Components/QuizScreen"
// import logo from './logo.svg';

import './App.css';
import logo from "./Images/splash.png"



function App() {
  
  const [quizEnd, setQuizEnd] = useState(true) // ! Original state = false


  function handleQuizEnd(){
    setQuizEnd(prevState => !prevState)
  }

  return (
    <main>
        {quizEnd ? 
        <QuizScreen/> : 
        <StartingScreen logo={logo} handleClick={handleQuizEnd}/>}
    </main>
  );
}

export default App;
