import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton'; // Import TarotButton
import './JournalView.css'; // Import the CSS file

function JournalView({ goBack }) {
  const [journalEntries, setJournalEntries] = useState(null);

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
      {!journalEntries ? (
        <div>Loading...</div> // Or a loading spinner
      ) : (
        journalEntries.map((entry) => (
          <div key={entry.id} className="cardContainer">
            <h3>{new Date(entry.date).toLocaleDateString()}</h3>
            {entry.drawnCards.map((card, index) => (
              <div key={index}>
                <img
                  src={process.env.PUBLIC_URL + `/images/${card.imageName}.png`}
                  alt={card.name}
                  className="cardImage"
                  onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/placeholderImage.png'}}  
                />
                <p>Position: {card.position}</p>
                <p>Card: {card.name}</p>
                <p>Interpretation: {card.interpretations}</p>
              </div>
            ))}
            <textarea
              placeholder="Comments"
              value={entry.comments || ""}
              onChange={(e) => updateComment(entry.id, e.target.value)}
              onBlur={() => localStorage.setItem('journalEntries', JSON.stringify(journalEntries))}
            />
            <button onClick={() => deleteEntry(entry.id)}>Delete Entry</button>
          </div>
        ))
      )}
    </div>
  );
}

export default JournalView;
