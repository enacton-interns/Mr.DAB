import React, { useEffect, useState } from 'react';
const MOODS = [{
  id: 'happy',
  emoji: '😊',
  label: 'Happy',
  color: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900 dark:border-yellow-700'
}, {
  id: 'calm',
  emoji: '😌',
  label: 'Calm',
  color: 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
}, {
  id: 'sad',
  emoji: '😔',
  label: 'Sad',
  color: 'bg-indigo-100 border-indigo-300 dark:bg-indigo-900 dark:border-indigo-700'
}, {
  id: 'stressed',
  emoji: '😣',
  label: 'Stressed',
  color: 'bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700'
}, {
  id: 'excited',
  emoji: '😃',
  label: 'Excited',
  color: 'bg-orange-100 border-orange-300 dark:bg-orange-900 dark:border-orange-700'
}, {
  id: 'tired',
  emoji: '😴',
  label: 'Tired',
  color: 'bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-700'
}];
export const MoodSelector = ({
  onSelect
}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [todaysMood, setTodaysMood] = useState(null);
  useEffect(() => {
    // Check if we already logged a mood today
    const storedMoods = localStorage.getItem('moodLogs');
    if (storedMoods) {
      const moodLogs = JSON.parse(storedMoods);
      const today = new Date().toISOString().split('T')[0];
      const todayLog = moodLogs.find(log => log.date === today);
      if (todayLog) {
        setTodaysMood(todayLog.mood);
        setSelectedMood(todayLog.mood);
        setNote(todayLog.note || '');
      }
    }
  }, []);
  const handleMoodClick = moodId => {
    setSelectedMood(moodId);
  };
  const handleSave = () => {
    if (selectedMood) {
      onSelect(selectedMood, note);
      setTodaysMood(selectedMood);
      alert('Your mood has been saved!');
    } else {
      alert('Please select a mood first.');
    }
  };
  return <div>
      {todaysMood ? <div className="mb-4 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-green-800 dark:text-green-200 text-sm">
            You've already logged your mood for today as{' '}
            <strong>{MOODS.find(m => m.id === todaysMood)?.label}</strong>.
            You can update it below.
          </p>
        </div> : null}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
        {MOODS.map(mood => <button key={mood.id} onClick={() => handleMoodClick(mood.id)} className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${selectedMood === mood.id ? `${mood.color} border-4` : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-650'}`}>
            <span className="text-3xl mb-2" role="img" aria-label={mood.label}>
              {mood.emoji}
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {mood.label}
            </span>
          </button>)}
      </div>
      <div className="mb-4">
        <label htmlFor="mood-note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Add a note about how you feel (optional)
        </label>
        <textarea id="mood-note" value={note} onChange={e => setNote(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" rows={2} placeholder="What's contributing to your mood today?" />
      </div>
      <div className="flex justify-end">
        <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:opacity-90 transition-opacity">
          Save Mood
        </button>
      </div>
    </div>;
};