import React, { useState, useEffect } from "react";
import Line from "./Line";

const Wordle = ({ data }) => {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameIsOver, setGameIsOver] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameIsOver) {
        return;
      }
      if (e.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        const isCorrect = data === currentGuess;
        if (isCorrect) {
          setGameIsOver(true);
        }
      }

      if (e.key === "Backspace") {
        setCurrentGuess((currentGuess) => currentGuess.slice(0, -1));
        return;
      }
      if (currentGuess.length >= 5) {
        return;
      }
      const isLetter = e.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((prevGuess) => prevGuess + e.key);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, data, gameIsOver, guesses]);

  return (
    <div className="board">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val=>val === null);
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            key={i}
            isFinal={!isCurrentGuess && guess != null}
            data={data}
          />
        );
      })}
    </div>
  );
};

export default Wordle;
