import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Header } from "./components/Header";
import { QuoteDisplay } from "./components/QuoteDisplay";
import { JournalSection } from "./components/JournalSection";
import { MoodTracker } from "./components/MoodTracker";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  console.log("Dark mode:", darkMode);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-100  to-purple-100 text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="fixed top-6 right-6 z-10">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 text-yellow-300"
                : "bg-gray-800 text-yellow-300 shadow-md"
            }`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
        <main className="mt-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "journal" && <JournalSection />}
          {activeTab === "moods" && <MoodTracker />}
          {activeTab === "quotes" && <QuoteDisplay fullPage />}
        </main>
      </div>
    </div>
  );
}
