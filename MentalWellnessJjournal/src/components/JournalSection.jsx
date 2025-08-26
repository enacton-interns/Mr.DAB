import React, { useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { JournalEditor } from "./JournalEditor";
import { JournalList } from "./JournalList";
export const JournalSection = () => {
  const [journals, setJournals] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const storedJournals = localStorage.getItem("journals");
    if (storedJournals) {
      setJournals(JSON.parse(storedJournals));
    }
  }, []);
  
  const handleSaveJournal = (journal) => {
    let updatedJournals;
    if (editingJournal) {
      updatedJournals = journals.map((j) =>
        j.id === editingJournal.id
          ? {
              ...journal,
              id: editingJournal.id,
            }
          : j
      );
    } else {
      const newJournal = {
        ...journal,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      updatedJournals = [newJournal, ...journals];
    }
    setJournals(updatedJournals);
    localStorage.setItem("journals", JSON.stringify(updatedJournals));
    setShowEditor(false);
    setEditingJournal(null);
  };
  const handleEditJournal = (journal) => {
    setEditingJournal(journal);
    setShowEditor(true);
  };
  const handleDeleteJournal = (id) => {
    const updatedJournals = journals.filter((journal) => journal.id !== id);
    setJournals(updatedJournals);
    localStorage.setItem("journals", JSON.stringify(updatedJournals));
  };
  const filteredJournals = journals.filter(
    (journal) =>
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  return (
    <div className="space-y-6">
      {showEditor ? (
        <JournalEditor
          onSave={handleSaveJournal}
          onCancel={() => {
            setShowEditor(false);
            setEditingJournal(null);
          }}
          journal={editingJournal}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-primary dark:text-gray-200">
              Your Journal
            </h2>
            <button
              onClick={() => setShowEditor(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:opacity-90 transition-opacity"
            >
              <PlusIcon size={18} className="mr-1" />
              New Entry
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <JournalList
            journals={filteredJournals}
            onEdit={handleEditJournal}
            onDelete={handleDeleteJournal}
          />
        </>
      )}
    </div>
  );
};
