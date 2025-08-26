import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const MOOD_EMOJIS = {
  happy: '😊',
  calm: '😌',
  sad: '😔',
  stressed: '😣',
  excited: '😃',
  tired: '😴'
};
export const MoodCalendar = ({
  moodLogs
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedMood(null);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedMood(null);
  };
  const handleDateClick = day => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = clickedDate.toISOString().split('T')[0];
    const moodForDate = moodLogs.find(log => log.date === dateString);
    setSelectedDate(dateString);
    setSelectedMood(moodForDate || null);
  };
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', {
    month: 'long'
  });
  const renderCalendarDays = () => {
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const moodForDate = moodLogs.find(log => log.date === dateString);
      const isToday = new Date().toISOString().split('T')[0] === dateString;
      const isSelected = selectedDate === dateString;
      days.push(<div key={day} onClick={() => handleDateClick(day)} className={`h-10 sm:h-12 flex flex-col items-center justify-center rounded-md cursor-pointer relative ${isToday ? 'bg-blue-100 dark:bg-blue-900' : isSelected ? 'bg-purple-100 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
          {moodForDate && <span className="text-lg absolute bottom-0 right-1" role="img" aria-label={moodForDate.mood}>
              {MOOD_EMOJIS[moodForDate.mood]}
            </span>}
        </div>);
    }
    return days;
  };
  return <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Previous month">
          <ChevronLeftIcon size={20} />
        </button>
        <h4 className="text-lg font-medium">
          {monthName} {year}
        </h4>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Next month">
          <ChevronRightIcon size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">{renderCalendarDays()}</div>
      {selectedMood && <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">
              {MOOD_EMOJIS[selectedMood.mood]}
            </span>
            <h5 className="text-lg font-medium capitalize">
              {selectedMood.mood}
            </h5>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(selectedMood.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
          </p>
          {selectedMood.note && <p className="mt-2 text-gray-700 dark:text-gray-300">
              {selectedMood.note}
            </p>}
        </div>}
    </div>;
};