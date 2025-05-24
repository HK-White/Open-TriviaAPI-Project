import { useNavigate } from 'react-router-dom';

function StartButton({ playerName }) {
    const navigate = useNavigate();
    
    const handleStartGame = () => {
        navigate('/game');
    };
    
    return (
        <div className="start-button-wrapper">
            {playerName ? (
                <button 
                    className="start-button" 
                    onClick={handleStartGame}
                >
                    {`${playerName}'s Trivia Adventure`}
                </button>
            ) : (
                <div className="start-button-message">
                    <p>Please enter your name to start the game</p>
                    <button 
                        className="start-button" 
                        onClick={handleStartGame}
                        disabled
                    >
                        Start Game
                    </button>
                </div>
            )}
        </div>
    );
}

export default StartButton;