import React from 'react';
import PropTypes from 'prop-types';

const QuestionDisplay = ({ 
  playerName, 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  score, 
  onAnswerSelected 
}) => {
  if (!currentQuestion) {
    return <div className="error alert alert-danger">Question data is missing</div>;
  }

  return (
    <div className="question-container">
      <div className="game-info">
        <p>{playerName}'s Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        <p>Score: {score}</p>
      </div>
      
      <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      <p className="category">Category: {currentQuestion.category}</p>
      
      <div className="answers">
        {currentQuestion.all_answers.map((answer, index) => (
          <button 
            key={index} 
            className="answer-btn"
            onClick={() => onAnswerSelected(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

QuestionDisplay.propTypes = {
  playerName: PropTypes.string.isRequired,
  currentQuestion: PropTypes.object.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default QuestionDisplay;