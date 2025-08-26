import { languages } from "./languages";
import { clsx } from "clsx";
import { useState } from "react";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";

const AssemblyEndGame = () => {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  console.log(currentWord);

  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessedCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessedCount >= languages.length - 1;

  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const keyBoardElements = alphabets.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const languagesElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessedCount;
    const className = clsx("chips", { lost: isLanguageLost });
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    return (
      <span key={lang.name} className={className} style={styles}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shoudlRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClass = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span className={letterClass} key={index}>
        {shoudlRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    fareWell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className={gameStatusClass}>
          {getFarewellText(languages[wrongGuessedCount - 1].name)}
        </p>
      );
    }
    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2>
          <p>Well done 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: EndGame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="languages-chips">{languagesElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyBoardElements}</section>
      {isGameOver ? (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      ) : null}
    </main>
  );
};

export default AssemblyEndGame;

// Extra credit ideas:
// 01 Display the "remaining guesses" count
// 02 Render some kind of "anti-confetti" when the
// game is lost, or another animation of some kind
// 03 Set a timer on the game that causes a toss if the
// time runs out
