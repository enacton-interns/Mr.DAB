import React, { useEffect, useState } from 'react';
import { XIcon, CheckIcon } from 'lucide-react';
const TAGS = [{
  id: 'grateful',
  label: 'Grateful',
  color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}, {
  id: 'stressful',
  label: 'Stressful',
  color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}, {
  id: 'joyful',
  label: 'Joyful',
  color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
}, {
  id: 'anxious',
  label: 'Anxious',
  color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
}, {
  id: 'productive',
  label: 'Productive',
  color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
}, {
  id: 'reflective',
  label: 'Reflective',
  color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}];
export const JournalEditor = ({
  onSave,
  onCancel,
  journal = null
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
      setSelectedTags(journal.tags);
    }
  }, [journal]);
  const handleTagToggle = tagId => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please add a title for your journal entry.');
      return;
    }
    if (!content.trim()) {
      alert('Please write something in your journal.');
      return;
    }
    onSave({
      title,
      content,
      tags: selectedTags,
      timestamp: new Date().toISOString()
    });
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {journal ? 'Edit Journal Entry' : 'New Journal Entry'}
        </h3>
        <div className="space-x-2">
          <button onClick={onCancel} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Cancel">
            <XIcon size={20} />
          </button>
          <button onClick={handleSave} className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200" aria-label="Save">
            <CheckIcon size={20} />
          </button>
        </div>
      </div>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
      <textarea placeholder="Write your thoughts here..." value={content} onChange={e => setContent(e.target.value)} rows={10} className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          How are you feeling? (Select all that apply)
        </p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => <button key={tag.id} onClick={() => handleTagToggle(tag.id)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag.id) ? tag.color : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
              {tag.label}
            </button>)}
        </div>
      </div>
    </div>;
};