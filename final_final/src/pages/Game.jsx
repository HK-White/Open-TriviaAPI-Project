import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import { 
  GameSetup, 
  QuestionDisplay, 
  GameOver, 
  QuestionSubmissionForm, 
  LoadingSpinner, 
  ErrorMessage 
} from '../components';

// API utilities
import { fetchCategories, fetchQuestions, submitQuestion } from '../utils/api';

// Styles
import '../styles/Game.css';

function Game({ playerName = 'Player' }) {
  // State for categories
  const [categories, setCategories] = useState([]);
  
  // Game settings state object
  const [gameSettings, setGameSettings] = useState({
    selectedCategory: '',
    numberOfQuestions: 5,
    difficulty: 'easy'
  });
  
  // Game state
  const [gameState, setGameState] = useState({
    gameStarted: false,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    gameOver: false
  });
  
  // UI state
  const [uiState, setUiState] = useState({
    loading: false,
    error: null,
    showSubmitForm: false,
    submitSuccess: false
  });
  
  // New question state
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    category: '',
    difficulty: 'easy',
    correct_answer: '',
    incorrect_answers: ['', '', '']
  });

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setUiState(prev => ({ ...prev, loading: true, error: null }));
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        setUiState(prev => ({ ...prev, loading: false }));
      } catch (error) {
        setUiState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message || 'Failed to fetch categories. Please try again later.' 
        }));
      }
    };

    loadCategories();
  }, []);

  // Handle starting the game
  const handleStartGame = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      setUiState(prev => ({ ...prev, loading: true, error: null }));
      
      const questionsData = await fetchQuestions(gameSettings);
      
      setGameState({
        gameStarted: true,
        questions: questionsData,
        currentQuestionIndex: 0,
        score: 0,
        gameOver: false
      });
      
      setUiState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setUiState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to fetch questions. Please try again later.' 
      }));
    }
  }, [gameSettings]);

  // Handle answering a question
  const handleAnswer = useCallback((answer) => {
    const { questions, currentQuestionIndex, score } = gameState;
    const currentQuestion = questions[currentQuestionIndex];
    
    // Calculate new score
    const newScore = answer === currentQuestion.correct_answer ? score + 1 : score;
    
    // Check if this is the last question
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        score: newScore
      }));
    } else {
      // End the game
      setGameState(prev => ({
        ...prev,
        score: newScore,
        gameOver: true
      }));
    }
  }, [gameState]);

  // Handle new question submission form changes
  const handleNewQuestionChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('incorrect_answer_')) {
      const index = parseInt(name.split('_')[2]);
      const updatedIncorrectAnswers = [...newQuestion.incorrect_answers];
      updatedIncorrectAnswers[index] = value;
      
      setNewQuestion(prev => ({
        ...prev,
        incorrect_answers: updatedIncorrectAnswers
      }));
    } else {
      setNewQuestion(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, [newQuestion]);

  // Handle submitting a new question
  const handleSubmitNewQuestion = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      setUiState(prev => ({ ...prev, loading: true, error: null }));
      
      await submitQuestion(newQuestion);
      
      setUiState(prev => ({ 
        ...prev, 
        loading: false, 
        submitSuccess: true 
      }));
      
      // Reset form after submission
      setTimeout(() => {
        setNewQuestion({
          question: '',
          category: '',
          difficulty: 'easy',
          correct_answer: '',
          incorrect_answers: ['', '', '']
        });
        
        setUiState(prev => ({ 
          ...prev, 
          submitSuccess: false, 
          showSubmitForm: false 
        }));
      }, 2000);
    } catch (error) {
      setUiState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to submit question. Please try again later.' 
      }));
    }
  }, [newQuestion]);

  // Reset game to setup screen
  const handlePlayAgain = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameOver: false
    }));
  }, []);

  // Show question submission form
  const handleShowSubmitForm = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      showSubmitForm: true
    }));
  }, []);

  // Hide question submission form
  const handleHideSubmitForm = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      showSubmitForm: false
    }));
  }, []);

  // Retry after error
  const handleRetry = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // Destructure state for easier access
  const { gameStarted, questions, currentQuestionIndex, score, gameOver } = gameState;
  const { loading, error, showSubmitForm, submitSuccess } = uiState;

  return (
    <div className="game-container">
      <h1>{playerName}'s Trivia Game</h1>
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      
      {!gameStarted && !showSubmitForm && (
        <GameSetup 
          playerName={playerName}
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          categories={categories}
          onStartGame={handleStartGame}
        />
      )}
      
      {gameStarted && !gameOver && !showSubmitForm && questions.length > 0 && (
        <QuestionDisplay 
          playerName={playerName}
          currentQuestion={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          score={score}
          onAnswerSelected={handleAnswer}
        />
      )}
      
      {gameOver && !showSubmitForm && (
        <GameOver 
          playerName={playerName}
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
          onSubmitNewQuestion={handleShowSubmitForm}
        />
      )}
      
      {showSubmitForm && (
        <QuestionSubmissionForm 
          playerName={playerName}
          newQuestion={newQuestion}
          onQuestionChange={handleNewQuestionChange}
          onSubmit={handleSubmitNewQuestion}
          onCancel={handleHideSubmitForm}
          submitSuccess={submitSuccess}
        />
      )}
      
      <div className="navigation">
        <Link to="/" className="btn btn-outline-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

Game.propTypes = {
  playerName: PropTypes.string
};

export default Game;