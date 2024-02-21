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

  return (
    <div>
      <TarotButton title="Back" onClick={goBack} />
      <h2>Journal Entries</h2>
      {journalEntries.map((entry) => (
        <div key={entry.id} className="cardContainer"> {/* Apply the .cardContainer class */}
          <h3>{new Date(entry.date).toLocaleDateString()}</h3>
          {entry.drawnCards.map((card, index) => (
            <div key={index}>
             <img src={card.image} alt={card.name} className="cardImage" />  
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
      ))}
    </div>
  );
}

export default JournalView;
