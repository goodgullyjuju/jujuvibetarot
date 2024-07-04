import React, { useState, useEffect, useCallback } from 'react';
import TarotButton from './TarotButton';
import './OneCardDealView.css';
import { Scrollbar } from 'react-scrollbars-custom'; // Correct import
import { saveJournalEntry } from './journalUtils'; // Adjust this path if needed

function OneCardDealView({ goBack }) {
  const [cards, setCards] = useState([]);
  const [drawnCard, setDrawnCard] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [redrawCounter, setRedrawCounter] = useState(0);
  const [showingSaveAlert, setShowingSaveAlert] = useState(false);
  const [comment, setComment] = useState(""); // State to handle comments

  useEffect(() => {
    fetch('https://goodgullyjuju.github.io/jujuvibetarot/TarotCards.json')
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  const drawCard = useCallback(() => {
    if (cards.length === 0) return;
    const newCard = cards[Math.floor(Math.random() * cards.length)];
    setDrawnCard(newCard);
    setShowCard(true); // This correctly sets showCard to true
    setRedrawCounter(prevCounter => prevCounter + 1);
  }, [cards]); // Depend on cards to recalculate when cards state changes

  const saveEntry = () => {
    if (drawnCard) {
      const newEntry = {
        id: new Date().getTime(),
        date: new Date().toISOString(),
        drawnCards: [{ 
          id: drawnCard.id, 
          name: drawnCard.name,
          imageName: drawnCard.imageName,
          interpretations: drawnCard.interpretations,
          position: "Single Card", // Optional, depending on your needs
        }],
        spreadType: "SingleCard",
        comments: comment,
      };
      saveJournalEntry(newEntry);
      setShowingSaveAlert(true);
      setTimeout(() => setShowingSaveAlert(false), 3000);
      setComment(""); // Reset comment after saving
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '1rem' }}>
      <TarotButton title="Back" onClick={goBack} />
      {drawnCard && (
        <>
          <img
            src={process.env.PUBLIC_URL + `/images/${drawnCard.imageName}.png`}
            alt={drawnCard.name}
            className="cardImage card-animation"
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = process.env.PUBLIC_URL + '/placeholderImage.png'; 
            }}
          />
          <h2 className="cardName">{drawnCard.name}</h2> {/* Display card name */}
          <div className="interpretation">
            <Scrollbar style={{ height: 200 }}>
              <div>{drawnCard.interpretations}</div>
            </Scrollbar>
          </div>
          <textarea
            placeholder="Add comments about your reading here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "100%", margin: "10px 0" }}
          />
          <TarotButton title="Draw Another Card" onClick={drawCard} />
          <TarotButton title="Save Entry" onClick={saveEntry} />
        </>
      )}
      {!drawnCard && <TarotButton title="Draw a Card" onClick={drawCard} />}
      {showingSaveAlert && <div>Saved! Your card has been saved to the journal.</div>}
    </div>
  );
}

export default OneCardDealView;
