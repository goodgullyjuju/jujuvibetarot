export const saveJournalEntry = (entry) => {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  };
  