import React, { useEffect, useState } from 'react';
const MOOD_EMOJIS = {
  happy: '😊',
  calm: '😌',
  sad: '😔',
  stressed: '😣',
  excited: '😃',
  tired: '😴'
};
export const MoodSummary = () => {
  const [todayMood, setTodayMood] = useState(null);
  const [weekMoods, setWeekMoods] = useState([]);
  const [dominantMood, setDominantMood] = useState(null);
  useEffect(() => {
    const storedMoods = localStorage.getItem('moodLogs');
    if (storedMoods) {
      const moodLogs = JSON.parse(storedMoods);
      // Get today's mood
      const today = new Date().toISOString().split('T')[0];
      const todayLog = moodLogs.find(log => log.date === today);
      setTodayMood(todayLog);
      // Get the past week's moods
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const weekLogs = moodLogs.filter(log => new Date(log.date) >= oneWeekAgo);
      setWeekMoods(weekLogs);
      // Calculate the dominant mood
      if (weekLogs.length > 0) {
        const moodCounts = weekLogs.reduce((acc, log) => {
          acc[log.mood] = (acc[log.mood] || 0) + 1;
          return acc;
        }, {});
        const dominantMoodName = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
        setDominantMood({
          name: dominantMoodName,
          count: moodCounts[dominantMoodName]
        });
      }
    }
  }, []);
  if (!todayMood && weekMoods.length === 0) {
    return <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">
          No mood data available yet.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Start tracking your moods to see a summary here.
        </p>
      </div>;
  }
  return <div className="space-y-4">
      {todayMood ? <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Today's Mood
          </h4>
          <div className="flex items-center">
            <span className="text-3xl mr-2" role="img" aria-label={todayMood.mood}>
              {MOOD_EMOJIS[todayMood.mood]}
            </span>
            <div>
              <p className="font-medium capitalize">{todayMood.mood}</p>
              {todayMood.note && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {todayMood.note}
                </p>}
            </div>
          </div>
        </div> : <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You haven't tracked your mood today.
          </p>
        </div>}
      {dominantMood && <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            This Week's Pattern
          </h4>
          <div className="flex items-center">
            <span className="text-2xl mr-2" role="img" aria-label={dominantMood.name}>
              {MOOD_EMOJIS[dominantMood.name]}
            </span>
            <p className="text-sm">
              You've been mostly{' '}
              <span className="font-medium capitalize">
                {dominantMood.name}
              </span>{' '}
              this week ({dominantMood.count} of {weekMoods.length} days)
            </p>
          </div>
        </div>}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Recent Moods
        </h4>
        <div className="flex flex-wrap gap-2">
          {weekMoods.length > 0 ? weekMoods.slice(-5).map((log, index) => <div key={index} className="flex flex-col items-center">
                <span className="text-xl" role="img" aria-label={log.mood}>
                  {MOOD_EMOJIS[log.mood]}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(log.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
                </span>
              </div>) : <p className="text-sm text-gray-500 dark:text-gray-400">
              No recent moods tracked.
            </p>}
        </div>
      </div>
    </div>;
};