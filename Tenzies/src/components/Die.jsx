const Die = ({ isHeld, value, hold }) => {
  return (
    <button
      className={`w-10 h-10 sm:w-[35px] sm:h-[35px] text-base sm:text-sm font-bold rounded-md flex items-center justify-center shadow-md transition-all ${
        isHeld ? "bg-green-300" : "bg-white"
      }`}
      onClick={hold}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
};

export default Die;
