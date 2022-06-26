import React, { useState, useEffect } from "react";
import Line from "./Line";

const Wordle = ({ data }) => {
  const randomWords = data && data[Math.floor(Math.random() * data.length)];
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameIsOver, setGameIsOver] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameIsOver) {
        return;
      }
      if (e.key === 'Enter') {
        if (currentGuess.length !== 5) {
          return;
        }
        const isCorrect = data === currentGuess;
        if (isCorrect) {
            setGameIsOver(true);
        }
      }

      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess=>currentGuess.slice(0, -1))
        return;
      }
            if (currentGuess.length >= 5) {
              return;
            }

      setCurrentGuess((prevGuess)=>prevGuess + e.key)

    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, data, gameIsOver]);

  return (
    <div className="board">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val=>val === null)
        return <Line guess={isCurrentGuess ? currentGuess : ""} key={i} isFinal={!isCurrentGuess && guess != null} data={data}/>;
      })}
    </div>
  );
};

export default Wordle;
