import { useState } from "react";

const State = () => {
  const [count, setCount] = useState(0);
  // function handleDecrement() {
  //     setCount(count-1);
  // }

  function handleDecrement() {
    setCount((prevCount) => prevCount - 1);
  }

  // function handleIncrement() {
  //     setCount(count+1);
  // }

  function handleIncrementf() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <main className="container">
      <h1>How many times will Bob say "state" in this section?</h1>
      <div className="counter">
        <button
          onClick={handleDecrement}
          className="minus"
          aria-label="Decrease Count"
        >
          -
        </button>
        <h2 className="count">{count}</h2>
        <button
          onClick={handleIncrement}
          className="plus"
          aria-label="Increase Count"
        >
          +
        </button>
      </div>
    </main>
  );
};

export default State;
