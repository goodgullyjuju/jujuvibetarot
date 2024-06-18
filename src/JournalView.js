import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton'; // Import TarotButton
import './JournalView.css'; // Import the CSS file

function JournalView({ goBack }) {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setJournalEntries(entries);
  }, []);

  const updateComment = (id, comment) => {
    const updatedEntries = journalEntries.map(entry => {
      if (entry.id === id) {
        return { ...entry, comments: comment };
      }
      return entry;
    });
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const deleteEntry = (id) => {
    const updatedEntries = journalEntries.filter(entry => entry.id !== id);
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const exportEntries = () => {
    const dataStr = JSON.stringify(journalEntries);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'journalEntries.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importEntries = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const importedEntries = JSON.parse(e.target.result);
      setJournalEntries(importedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(importedEntries));
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div>
      <TarotButton title="Back" onClick={goBack} />
      <h2>Journal Entries</h2>
      <div>
        <TarotButton title="Export Entries" onClick={exportEntries} />
        <input
          type="file"
          accept=".json"
          onChange={importEntries}
          style={{ display: 'none' }}
          id="import-file"
        />
        <label htmlFor="import-file">
          <TarotButton title="Import Entries" />
        </label>
      </div>
      {journalEntries.map((entry) => (
        <div key={entry.id} className="cardContainer">
          {/* ... (your other entry details) */}
          {entry.drawnCards.map((card, index) => (
            <div key={index}>
              <img 
                src={process.env.PUBLIC_URL + `/images/${card.imageName}.png`} 
                alt={card.name} 
                className="cardImage"
                onError={(e) => { e.target.onerror = null; e.target.src = 'placeholderImage.png'}}  // This line adds a fallback image if the card image fails to load
              />
              {/* ... (rest of your card details) */}
            </div>
          ))}
          {/* ... (rest of your entry details) */}
        </div>
      ))}
    </div>
  );
}

export default JournalView;