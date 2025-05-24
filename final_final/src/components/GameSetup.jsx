import React from 'react';
import PropTypes from 'prop-types';

const GameSetup = ({ 
  playerName, 
  gameSettings, 
  setGameSettings, 
  categories, 
  onStartGame 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  return (
    <div className="game-setup">
      <h2>{playerName}'s Game Setup</h2>
      <form onSubmit={onStartGame}>
        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select 
            id="category" 
            name="selectedCategory"
            className="form-control"
            value={gameSettings.selectedCategory}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <input 
            type="number" 
            id="numberOfQuestions" 
            name="numberOfQuestions"
            className="form-control"
            min="1" 
            max="50"
            value={gameSettings.numberOfQuestions}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            className="form-control"
            value={gameSettings.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Start {playerName}'s Trivia Challenge
        </button>
      </form>
    </div>
  );
};

GameSetup.propTypes = {
  playerName: PropTypes.string.isRequired,
  gameSettings: PropTypes.shape({
    selectedCategory: PropTypes.string,
    numberOfQuestions: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    difficulty: PropTypes.string
  }).isRequired,
  setGameSettings: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onStartGame: PropTypes.func.isRequired
};

export default GameSetup;