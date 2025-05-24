import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomeHeader from './components/WelcomeHeader'
import WelcomeBody from './components/WelcomeBody'
import InstructionsHeader from './components/InstructionsHeader'
import Instructions from './components/Instructions'
import SimpleNameCollector from './components/UsersName'
import StartButton from './components/StartButton'
import Game from './pages/Game'

function App() {
  const [playerName, setPlayerName] = useState('');

  // Function to update player name from SimpleNameCollector
  const handleNameUpdate = (name) => {
    setPlayerName(name);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage 
            playerName={playerName} 
            onNameUpdate={handleNameUpdate} 
          />
        } />
        <Route path="/game" element={
          <Game playerName={playerName} />
        } />
      </Routes>
    </Router>
  );
}

function HomePage({ playerName, onNameUpdate }) {
  return (
    <>
      <div className="main-container">
        {/* Welcome Section */}
        <div className='welcome'>
          <WelcomeHeader />
          <WelcomeBody />
        </div>
        {/* Instructions Section */}
        <div className='instructions'>
          <InstructionsHeader />
          <Instructions />
        </div>
        {/* Name Collector Section */}
        <div className='name-collector'>
          <h1>Enter Your Name</h1>
          <SimpleNameCollector onNameSaved={onNameUpdate} />
        </div>
      </div>
      <div className="start-button-container">
        <StartButton playerName={playerName} />
      </div>    
      <div className="footer">
        <p>Trivia+ &copy; 2025</p>
        <p>Project by: Hayden White</p>
      </div>
    </>
  );
}

export default App
