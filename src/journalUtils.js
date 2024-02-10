// src/journalUtils.js

/**
 * Saves a journal entry to localStorage.
 * @param {Object} entry - The journal entry to be saved.
 */
export const saveJournalEntry = (entry) => {
    // Attempt to load existing entries from localStorage, or initialize an empty array if none exist.
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  
    // Add the new entry to the array of entries.
    journalEntries.push(entry);
  
    // Save the updated array back to localStorage.
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  };
  