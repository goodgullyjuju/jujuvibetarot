import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';
import CardView from './CardView';
import { saveJournalEntry } from './journalUtils.js'; // Adjust the path as needed

function ThreeCardDealView({ goBack }) { // Accepting goBack prop
    const [cards, setCards] = useState([]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [showSpreadOptions, setShowSpreadOptions] = useState(false);
    const [selectedSpread, setSelectedSpread] = useState("");
    const [showingSaveAlert, setShowingSaveAlert] = useState(false);
    const [comments, setComments] = useState(""); // State to hold user comments

    const spreadOptions = [
        "Past, Present, Future",
        "Current Situation, Opportunity, Outcome",
        "Current Situation, Obstacle, Solution",
        "You, Your Love Interest, Relationship"
    ];

    useEffect(() => {
        fetch('https://goodgullyjuju.github.io/jujuvibetarot/TarotCards.json')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const drawThreeCards = () => {
        if (cards.length < 3) return;
        const shuffled = cards.sort(() => 0.5 - Math.random());
        const selectedCards = shuffled.slice(0, 3);
        setDrawnCards(selectedCards);
        setShowSpreadOptions(true);
    };

    const selectSpread = (spread) => {
        setSelectedSpread(spread);
        setShowSpreadOptions(false);
    };

    const saveEntry = () => {
        if (drawnCards.length > 0) {
            const newEntry = {
                id: new Date().getTime(),
                date: new Date().toISOString(),
                drawnCards: drawnCards.map(card => ({
                    id: card.id,
                    name: card.name,
                    // Ensure the imageName is set to the path used in the JournalView
                    image: `/images/${card.imageName}.png`,
                    interpretations: card.interpretations,
                    position: card.position, // Ensure this is set for CelticCrossSpreadView
                })),
                spreadType: selectedSpread || "CelticCross", // Use "CelticCross" or other spread type as applicable
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
            <TarotButton title="Back" onClick={goBack} /> {/* Render the "Back" button */}
            {!showSpreadOptions && !selectedSpread && (
                <TarotButton title="Draw Three Cards" onClick={drawThreeCards} />
            )}
            {showSpreadOptions && spreadOptions.map((option, index) => (
                <TarotButton key={index} title={option} onClick={() => selectSpread(option)} />
            ))}
            {selectedSpread && (
                <>
                    {drawnCards.map((card, index) => (
                        <div key={index}>
                            <h3>{selectedSpread.split(", ")[index]}</h3>
                            <CardView card={card} showCard={true} />
                        </div>
                    ))}
                    <textarea
                        placeholder="Add your comments here..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                    />
                    <TarotButton title="Save Entry" onClick={saveEntry} />
                </>
            )}
            {showingSaveAlert && <div>Saved! Your cards have been saved to the journal.</div>}
        </div>
    );
}

export default ThreeCardDealView;
