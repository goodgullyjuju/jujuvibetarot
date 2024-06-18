import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';

import { saveJournalEntry } from './journalUtils.js'; // Ensure this path is correct

function CelticCrossSpreadView({ goBack }) {
    const [cards, setCards] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [showSpread, setShowSpread] = useState(false);
    const [showingSaveAlert, setShowingSaveAlert] = useState(false);
    const [comments, setComments] = useState(""); // State to hold user comments

    const celticCrossPositions = [
        "Present", "Challenge", "Past", "Below (Subconscious Influence)",
        "Above (Goals and Destiny)", "Immediate Future", "Advice",
        "External Influences", "Hopes and Fears", "Outcome"
    ];

    useEffect(() => {
        fetch('https://goodgullyjuju.github.io/jujuvibetarot/TarotCards.json')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const drawCardsForSpread = () => {
        if (cards.length < 10) return;
        const shuffled = cards.sort(() => 0.5 - Math.random());
        const selectedCards = shuffled.slice(0, 10);
        setDrawnCards(selectedCards);
        setShowSpread(true);
    };

    const saveEntry = () => {
        if (drawnCards.length > 0) {
            const newEntry = {
                id: new Date().getTime(),
                date: new Date().toISOString(),
                drawnCards: drawnCards.map((card, index) => ({
                    id: card.id,
                    name: card.name,
                    // Ensure the imageName is set to the path used in the JournalView
                    image: card.imageName,
                    interpretations: card.interpretations,
                    position: celticCrossPositions[index],
                })),
                spreadType: "CelticCross", // Directly setting the spread type
                comments: comments,
            };
            saveJournalEntry(newEntry);
            setComments(""); // Clear comments after saving
            setShowingSaveAlert(true);
            setTimeout(() => setShowingSaveAlert(false), 3000);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
            <TarotButton title="Back" onClick={goBack} /> {/* Corrected line */}
            {showSpread ? (
                <>
                    {drawnCards.map((card, index) => (
                        <div key={index}>
                            <h3>{celticCrossPositions[index]}</h3> {/* Display the position label */}
                            <img
                src={process.env.PUBLIC_URL + `/images/${card.imageName}.png`}
                alt={card.name}
                className="cardImage"
                onError={(e) => { e.target.onerror = null; e.target.src = 'placeholderImage.png'}} 
              />
                        </div>
                    ))}
                    <textarea
                        placeholder="Add comments about your spread here..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        style={{ width: "100%", height: "100px", marginTop: "20px" }}
                    />
                    <TarotButton title="Draw Again" onClick={drawCardsForSpread} />
                    <TarotButton title="Save Entry" onClick={saveEntry} />
                </>
            ) : (
                <TarotButton title="Draw Cards For Celtic Cross Spread" onClick={drawCardsForSpread} />
            )}
            {showingSaveAlert && <div>Saved! Your cards have been saved to the journal.</div>}
        </div>
    );
}

export default CelticCrossSpreadView;
