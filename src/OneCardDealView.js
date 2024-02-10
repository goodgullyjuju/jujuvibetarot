import React, { useState, useEffect, useCallback } from 'react';
import TarotButton from './TarotButton';
import './OneCardDealView.css';
import CardView from './CardView';
import { saveJournalEntry } from './journalUtils.js'; // Ensure this path is correct

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
    }, []);

    const drawCard = useCallback(() => {
        if (cards.length === 0) return;
        const newCard = cards[Math.floor(Math.random() * cards.length)];
        setDrawnCard(newCard);
        setShowCard(true);
        setRedrawCounter(prevCounter => prevCounter + 1);
    }, [cards]);

    const saveEntry = () => {
        if (drawnCard) {
            const newEntry = {
                id: new Date().getTime(),
                date: new Date().toISOString(),
                drawnCards: [drawnCard],
                spreadType: "SingleCard",
                comments: comment, // Include comment in the entry
            };
            saveJournalEntry(newEntry);
            setShowingSaveAlert(true);
            setTimeout(() => setShowingSaveAlert(false), 3000);
            setComment(""); // Reset comment after saving
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
            <TarotButton title="Back" onClick={goBack} /> {/* Back button to return to the main view */}
            {drawnCard && (
                <>
                    <CardView card={drawnCard} showCard={showCard} redrawCounter={redrawCounter} />
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
            {!drawnCard && (
                <TarotButton title="Draw a Card" onClick={drawCard} />
            )}
            {showingSaveAlert && <div>Saved! Your card has been saved to the journal.</div>}
        </div>
    );
}

export default OneCardDealView;
