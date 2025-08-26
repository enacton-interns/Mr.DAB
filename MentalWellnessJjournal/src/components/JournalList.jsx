import React from 'react';
import { EditIcon, TrashIcon } from 'lucide-react';
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
export const JournalList = ({
  journals,
  onEdit,
  onDelete
}) => {
  if (journals.length === 0) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No journal entries found.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Start writing your thoughts to see them here.
        </p>
      </div>;
  }
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className="space-y-4">
      {journals.map(journal => <div key={journal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {journal.title}
            </h3>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(journal)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" aria-label="Edit journal">
                <EditIcon size={18} />
              </button>
              <button onClick={() => {
            if (window.confirm('Are you sure you want to delete this journal entry?')) {
              onDelete(journal.id);
            }
          }} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" aria-label="Delete journal">
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            {formatDate(journal.timestamp)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
            {journal.content.length > 200 ? `${journal.content.substring(0, 200)}...` : journal.content}
          </p>
          {journal.tags && journal.tags.length > 0 && <div className="flex flex-wrap gap-2">
              {journal.tags.map(tag => <span key={tag} className={`px-2 py-1 rounded-full text-xs ${TAGS[tag]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                  {TAGS[tag]?.label || tag}
                </span>)}
            </div>}
        </div>)}
    </div>;
};