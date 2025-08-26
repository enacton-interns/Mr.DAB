import React, { useEffect, useState } from 'react';
import { CalendarIcon, BarChartIcon } from 'lucide-react';
import { MoodSelector } from './MoodSelector';
import { MoodCalendar } from './MoodCalendar';
import { MoodChart } from './MoodChart';
export const MoodTracker = () => {
  const [moodLogs, setMoodLogs] = useState([]);
  const [view, setView] = useState('calendar'); // 'calendar' or 'chart'
  useEffect(() => {
    const storedMoods = localStorage.getItem('moodLogs');
    if (storedMoods) {
      setMoodLogs(JSON.parse(storedMoods));
    }
  }, []);
  const handleMoodSelect = (mood, note = '') => {
    const today = new Date().toISOString().split('T')[0];
    // Check if we already have a mood for today
    const existingIndex = moodLogs.findIndex(log => log.date === today);
    let updatedLogs;
    if (existingIndex >= 0) {
      updatedLogs = [...moodLogs];
      updatedLogs[existingIndex] = {
        date: today,
        mood,
        note
      };
    } else {
      updatedLogs = [...moodLogs, {
        date: today,
        mood,
        note
      }];
    }
    setMoodLogs(updatedLogs);
    localStorage.setItem('moodLogs', JSON.stringify(updatedLogs));
  };
  return <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          How are you feeling today?
        </h3>
        <MoodSelector onSelect={handleMoodSelect} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your Mood History
          </h3>
          <div className="flex space-x-2">
            <button onClick={() => setView('calendar')} className={`p-2 rounded-md ${view === 'calendar' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`} aria-label="Calendar view">
              <CalendarIcon size={20} />
            </button>
            <button onClick={() => setView('chart')} className={`p-2 rounded-md ${view === 'chart' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`} aria-label="Chart view">
              <BarChartIcon size={20} />
            </button>
          </div>
        </div>
        {view === 'calendar' ? <MoodCalendar moodLogs={moodLogs} /> : <MoodChart moodLogs={moodLogs} />}
      </div>
    </div>;
};