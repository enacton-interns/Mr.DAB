import React, { useEffect, useState } from 'react';
const TAGS = {
  grateful: {
    label: 'Grateful',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  stressful: {
    label: 'Stressful',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  },
  joyful: {
    label: 'Joyful',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  },
  anxious: {
    label: 'Anxious',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  },
  productive: {
    label: 'Productive',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  reflective: {
    label: 'Reflective',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
};
export const RecentJournals = () => {
  const [recentEntries, setRecentEntries] = useState([]);
  useEffect(() => {
    const storedJournals = localStorage.getItem('journals');
    if (storedJournals) {
      const journals = JSON.parse(storedJournals);
      // Sort by timestamp (newest first) and take the 3 most recent
      const sorted = [...journals].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 3);
      setRecentEntries(sorted);
    }
  }, []);
  if (recentEntries.length === 0) {
    return <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">
          No journal entries yet.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Start writing in your journal to see recent entries here.
        </p>
      </div>;
  }
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="space-y-3">
      {recentEntries.map(entry => <div key={entry.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
          <div className="flex justify-between items-start">
            <h5 className="font-medium text-gray-800 dark:text-gray-200">
              {entry.title}
            </h5>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(entry.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {entry.content}
          </p>
          {entry.tags && entry.tags.length > 0 && <div className="flex flex-wrap gap-1 mt-2">
              {entry.tags.map(tag => <span key={tag} className={`px-2 py-0.5 rounded-full text-xs ${TAGS[tag]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                  {TAGS[tag]?.label || tag}
                </span>)}
            </div>}
        </div>)}
    </div>;
};