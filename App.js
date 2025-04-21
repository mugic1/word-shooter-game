const App = () => {
  const [words, setWords] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const wordList = ['React', 'JavaScript', 'HTML', 'CSS', 'GitHub', 'Game', 'Mobile', 'Phone'];

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        text: wordList[Math.floor(Math.random() * wordList.length)],
        top: 0,
        left: Math.random() * 80
      };
      setWords(prev => [...prev, newWord]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const moveWords = setInterval(() => {
      setWords(prev => prev.map(word => ({
        ...word,
        top: word.top + 0.5
      })).filter(word => word.top < 90));
    }, 50);

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
      <h1>Word Shooter Game</h1>
      <h2>Score: {score}</h2>
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
        autoFocus
      />
      {gameOver && <div className="game-over">Game Over! Refresh to play again.</div>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
