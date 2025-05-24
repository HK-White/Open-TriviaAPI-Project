import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      {message}
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

export default LoadingSpinner;