import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error alert alert-danger">
      <p>{message}</p>
      {onRetry && (
        <button 
          className="btn btn-outline-danger mt-2" 
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func
};

export default ErrorMessage;