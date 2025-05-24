import React from 'react';
import PropTypes from 'prop-types';

const QuestionSubmissionForm = ({ 
  playerName, 
  newQuestion, 
  onQuestionChange, 
  onSubmit, 
  onCancel, 
  submitSuccess 
}) => {
  return (
    <div className="submit-question-form">
      <h2>{playerName}'s Question Submission</h2>
      
      {submitSuccess ? (
        <div className="alert alert-success">
          Thanks, {playerName}! Your question was submitted successfully!
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea 
              id="question" 
              name="question"
              className="form-control"
              value={newQuestion.question}
              onChange={onQuestionChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="new-category">Category:</label>
            <input 
              type="text" 
              id="new-category" 
              name="category"
              className="form-control"
              value={newQuestion.category}
              onChange={onQuestionChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="new-difficulty">Difficulty:</label>
            <select 
              id="new-difficulty" 
              name="difficulty"
              className="form-control"
              value={newQuestion.difficulty}
              onChange={onQuestionChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="correct-answer">Correct Answer:</label>
            <input 
              type="text" 
              id="correct-answer" 
              name="correct_answer"
              className="form-control"
              value={newQuestion.correct_answer}
              onChange={onQuestionChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Incorrect Answers:</label>
            {newQuestion.incorrect_answers.map((answer, index) => (
              <input 
                key={index}
                type="text" 
                name={`incorrect_answer_${index}`}
                className="form-control mb-2"
                placeholder={`Incorrect answer ${index + 1}`}
                value={answer}
                onChange={onQuestionChange}
                required
              />
            ))}
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Submit {playerName}'s Question
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

QuestionSubmissionForm.propTypes = {
  playerName: PropTypes.string.isRequired,
  newQuestion: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onQuestionChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired
};

export default QuestionSubmissionForm;