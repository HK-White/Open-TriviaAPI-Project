/**
 * API utility functions for the trivia game
 */

// Base URL for the Open Trivia API
const BASE_URL = 'https://opentdb.com';

/**
 * Fetch categories from the Open Trivia API
 * @returns {Promise<Array>} Array of category objects
 * @throws {Error} If the fetch fails
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

/**
 * Fetch questions based on user selections
 * @param {Object} params - The parameters for the API call
 * @param {number|string} params.numberOfQuestions - Number of questions to fetch
 * @param {string} params.selectedCategory - Category ID (optional)
 * @param {string} params.difficulty - Difficulty level
 * @returns {Promise<Array>} Array of processed question objects
 * @throws {Error} If the fetch fails or returns an error code
 */
export const fetchQuestions = async ({ numberOfQuestions, selectedCategory, difficulty }) => {
  try {
    const url = `${BASE_URL}/api.php?amount=${numberOfQuestions}${
      selectedCategory ? `&category=${selectedCategory}` : ''
    }&difficulty=${difficulty}&type=multiple`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code === 0) {
      // Process questions to include all answers in a single array
      return data.results.map(q => ({
        ...q,
        all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }));
    } else if (data.response_code === 1) {
      throw new Error('Not enough questions available with the selected criteria. Please try different options.');
    } else if (data.response_code === 2) {
      throw new Error('Invalid parameter in API request. Please check your inputs.');
    } else {
      throw new Error('Error fetching questions from the API. Please try again later.');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Submit a new question (mock implementation)
 * @param {Object} question - The question object to submit
 * @returns {Promise<Object>} Success response
 */
export const submitQuestion = async (question) => {
  // In a real application, this would send the question to a backend
  console.log('New question submitted:', question);
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Question submitted successfully' });
    }, 1000);
  });
};