import { useEffect, useState } from "react";
import { QuoteDisplay } from "./QuoteDisplay";
import { MoodSummary } from "./MoodSummary";
import { RecentJournals } from "./RecentJournals";

export const Dashboard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center py-6">
        <h2 className="text-2xl sm:text-3xl font-semibolds bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          {greeting}
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mt-2">
          How are you feeling today?
        </p>
      </div>
      <QuoteDisplay />
      {/* The change is in the line below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
            Your Recent Mood
          </h3>
          <MoodSummary />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
            Recent Journal Entries
          </h3>
          <RecentJournals />
        </div>
      </div>
    </div>
  );
};
