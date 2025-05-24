import { useState } from 'react';

function SimpleNameCollector({ onNameSaved }) {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      setSavedName(name);
      // Pass the name up to the parent component
      if (onNameSaved) {
        onNameSaved(name);
      }
      setName('');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSave();
    }
  };

  return (
    <div className="name-collector-form">
      <div className="input-group">
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your name"
          className="name-input"
        />
        <button 
          onClick={handleSave}
          className="save-name-btn"
          disabled={!name.trim()}
        >
          Save
        </button>
      </div>
      
      {savedName && (
        <div className="welcome-message">
          <h2>Hello, {savedName}!</h2>
          <p>Let's get the trivia started.</p>
        </div>
      )}
    </div>
  );
}

export default SimpleNameCollector;