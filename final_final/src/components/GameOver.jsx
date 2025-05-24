import React from 'react';
import PropTypes from 'prop-types';

const GameOver = ({ 
  playerName, 
  score, 
  totalQuestions, 
  onPlayAgain, 
  onSubmitNewQuestion 
}) => {
  const successRate = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="game-over">
      <h2>Game Over, {playerName}!</h2>
      <p>Your final score: {score} out of {totalQuestions}</p>
      <p>Success rate: {successRate}%</p>
      
      {score === totalQuestions && (
        <div className="perfect-score">
          <h3>Perfect Score! 🏆</h3>
          <p>Congratulations, {playerName}! You're a trivia master!</p>
        </div>
      )}
      
      {score === 0 && (
        <div className="zero-score">
          <h3>Don't give up, {playerName}!</h3>
          <p>Try again with a different category or difficulty.</p>
        </div>
      )}
      
      {score > 0 && score < totalQuestions && (
        <div className="partial-score">
          <h3>Good job, {playerName}!</h3>
          <p>You're on your way to becoming a trivia expert.</p>
        </div>
      )}
      
      <div className="game-over-buttons">
        <button className="btn btn-primary" onClick={onPlayAgain}>
          Play Again
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onSubmitNewQuestion}
        >
          Submit New Question
        </button>
      </div>
    </div>
  );
};

GameOver.propTypes = {
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onSubmitNewQuestion: PropTypes.func.isRequired
};

export default GameOver;