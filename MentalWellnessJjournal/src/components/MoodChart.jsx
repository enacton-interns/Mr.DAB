import React, { useEffect, useState } from 'react';
const MOOD_VALUES = {
  happy: 5,
  excited: 4,
  calm: 3,
  tired: 2,
  sad: 1,
  stressed: 0
};
const MOOD_COLORS = {
  happy: '#FFD700',
  excited: '#FF8C00',
  calm: '#4682B4',
  tired: '#9370DB',
  sad: '#6A5ACD',
  stressed: '#DC143C'
};
export const MoodChart = ({
  moodLogs
}) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (moodLogs.length === 0) return;
    // Sort logs by date
    const sortedLogs = [...moodLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    // Get the last 14 days of logs
    const recentLogs = sortedLogs.slice(-14);
    // Prepare data for chart
    const data = recentLogs.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      value: MOOD_VALUES[log.mood] || 0,
      mood: log.mood,
      color: MOOD_COLORS[log.mood] || '#888'
    }));
    setChartData(data);
  }, [moodLogs]);
  if (moodLogs.length === 0) {
    return <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No mood data available yet.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Start tracking your moods to see trends over time.
        </p>
      </div>;
  }
  const maxValue = 5; // Maximum mood value
  return <div>
      <h4 className="text-sm font-medium mb-4 text-gray-600 dark:text-gray-400">
        Your mood over the past 14 days
      </h4>
      <div className="relative h-60">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Great</span>
          <span>Good</span>
          <span>Neutral</span>
          <span>Low</span>
          <span>Bad</span>
        </div>
        {/* Chart area */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4, 5].map(value => <div key={value} className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700" style={{
          bottom: `${value / maxValue * 100}%`
        }}></div>)}
          {/* Data points and lines */}
          <div className="absolute inset-0 flex items-end">
            {chartData.map((point, index) => <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                {/* Bar */}
                <div className="w-4 rounded-t-sm transition-all duration-500 ease-in-out" style={{
              height: `${point.value / maxValue * 100}%`,
              backgroundColor: point.color,
              opacity: 0.7
            }}></div>
                {/* Date label */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 transform -rotate-45 origin-top-left">
                  {point.date}
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {Object.entries(MOOD_COLORS).map(([mood, color]) => <div key={mood} className="flex items-center">
            <div className="w-4 h-4 rounded-sm mr-1" style={{
          backgroundColor: color,
          opacity: 0.7
        }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {mood}
            </span>
          </div>)}
      </div>
    </div>;
};