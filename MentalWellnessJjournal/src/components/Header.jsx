import React from "react";
import {
  BookOpenIcon,
  SmileIcon,
  QuoteIcon,
  LayoutDashboardIcon,
} from "lucide-react";

export const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      id: "journal",
      label: "Journal",
      icon: <BookOpenIcon size={18} />,
    },
    {
      id: "moods",
      label: "Mood Tracker",
      icon: <SmileIcon size={18} />,
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: <QuoteIcon size={18} />,
    },
  ];
  return (
    <header className="w-full">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Mental Wellness Journal
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Track your thoughts, moods, and personal growth
      </p>
      {/* Updated Nav Section */}
      <nav className="flex justify-center mt-4">
        {/* On small screens (mobile), flex-col will stack items. On sm screens and up, flex-row will place them side-by-side. */}
        <div className="flex flex-col sm:flex-row sm:space-x-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center px-4 py-2 rounded-md transition-all w-full sm:w-auto my-1 sm:my-0 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};
