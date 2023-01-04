// import logo from './logo.svg';

import './App.css';
import StartingScreen from "./Components/StartingScreen"
import logo from "./Images/splash.png"


function App() {


  return (
    <main>
        <StartingScreen logo={logo}/>
    </main>
  );
}

export default App;
