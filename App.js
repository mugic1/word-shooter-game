import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const App = () => {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  const wordList = ['React', 'JavaScript', 'HTML', 'CSS', 'GitHub'];

  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        text: wordList[Math.floor(Math.random() * wordList.length)],
        top: 0,
        left: Math.random() * 80
      };
      setWords(prev => [...prev, newWord]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveWords = setInterval(() => {
      setWords(prev => prev.map(word => ({
        ...word,
        top: word.top + 1
      })).filter(word => word.top < 90);
    }, 100);

    return () => clearInterval(moveWords);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === ' ' && input.trim()) {
      const wordToRemove = words.find(w => w.text === input.trim());
      if (wordToRemove) {
        setWords(words.filter(w => w.id !== wordToRemove.id));
        setScore(prev => prev + 10);
      }
      setInput('');
    }
  };

  return (
    <div className="game-container">
      <h1>Score: {score}</h1>
      <div className="game-area">
        {words.map(word => (
          <div 
            key={word.id}
            className="word"
            style={{ top: `${word.top}%`, left: `${word.left}%` }}
          >
            {word.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Type word and press SPACE"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
