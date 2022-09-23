import React, { useState } from 'react';
import emojiLibrary from 'emojilib';
import './App.css';

function App() {
  const [textInput, setTextInput] = useState('')
  const [resultText, setResultText] = useState('')

  const handleChange = (e) => {
    setTextInput(e.target.value)
    setResultText(convertToEmojis(e.target.value))
  }

  const convertToEmojis = (message) => {
    const words = message.split(" ");
    const emojifiedMessage = words.map(word => {
      const punctationRegex = /[^\w\s]|_/g
      const keyword = word.replace(punctationRegex, "");
      const relatedEmoji = Object.keys(emojiLibrary).find(emoji => emojiLibrary[emoji].includes(keyword));

      return relatedEmoji ? word.replace(keyword, relatedEmoji) : word;
    })
    return emojifiedMessage.join(' ');
  }

  return (
    <div className="App">
      <header>
        <h1>Emojify! 😄</h1>
        <h2>Turn your text into emojis!</h2>
      </header>

      <main>
        <textarea
          value={textInput}
          onChange={handleChange}
          placeholder='Type here...'
          rows={4}>
        </textarea>

        <div
          className='result-box'
          data-testid='result-box'>
          {resultText}
        </div>
      </main>

      <footer>
        <p>❤️ This is a mock of <a href='https://matheusfreitag.github.io/emojify-react/' rel='noopener noreferrer' target='_blank'>Matheus Freitag's</a> Emojify</p>
      </footer>
    </div>
  );
}

export default App;
