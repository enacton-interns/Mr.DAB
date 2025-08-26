import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const btnRef = useRef(null);

  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  useEffect(() => {
    if (gameWon) {
      btnRef.current.focus();
    }
  }, [gameWon]);

  function allNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ));

  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(allNewDice());
    }
  }

  return (
    <main className="w-full max-w-[400px] min-h-[400px] bg-gray-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-evenly items-center mx-auto">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p className="win-message">
            You won! Press "New Game" to start again.
          </p>
        )}
      </div>
      <h1 className="text-[40px] text-center m-0 font-bold">Tenzies</h1>
      <p className="text-center font-semibold m-0 text-base sm:text-sm">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 justify-center my-4">
        {diceElements}
      </div>

      <button
        ref={btnRef}
        onClick={rollDice}
        className="bg-indigo-700 text-white py-2 px-6 h-[50px] sm:h-[45px] text-lg sm:text-base rounded-md cursor-pointer whitespace-nowrap"
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
