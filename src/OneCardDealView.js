import React, { useState, useEffect, useCallback } from 'react';
import TarotButton from './TarotButton'; // Assuming you have a TarotButton component
import './OneCardDealView.css';

function OneCardDealView() {
    const [cards, setCards] = useState([]);
    const [drawnCard, setDrawnCard] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [redrawCounter, setRedrawCounter] = useState(0);
    const [showingSaveAlert, setShowingSaveAlert] = useState(false);

    // Wrapped in useCallback to avoid useEffect dependencies issue
    const drawCard = useCallback(() => {
        if (cards.length === 0) return;
        setShowCard(false);
        const newCard = cards[Math.floor(Math.random() * cards.length)];
        setDrawnCard(newCard);
        setRedrawCounter(prevCounter => prevCounter + 1);
    }, [cards]);

    useEffect(() => {
        fetch('/TarotCards.json')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                if (data.length > 0) {
                    drawCard();
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [drawCard]); // drawCard is now a dependency

    const saveEntry = () => {
        setShowingSaveAlert(true);
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
            {drawnCard && (
                <>
                    <CardView card={drawnCard} showCard={showCard} redrawCounter={redrawCounter} />
                    <TarotButton title="Draw Another Card" onClick={drawCard} />
                    <TarotButton title="Save Entry" onClick={saveEntry} />
                </>
            )}
            {!drawnCard && <TarotButton title="Draw a Card" onClick={drawCard} />}
            {showingSaveAlert && <div>Saved! Your card has been saved to the journal.</div>}
        </div>
    );
}

function CardView({ card, showCard, redrawCounter }) {
    useEffect(() => {
        setShowCard(true); // Assuming setShowCard is needed here. If not, this effect can be removed
    }, [redrawCounter, setShowCard]);

    return (
        <div>
            <img src={`/images/${card.imageName}`} alt={card.name} className="card-animation" style={{ width: 300, height: 300, transform: `rotateY(${showCard ? '0' : '180'}deg)` }} />
            <h2>{card.name}</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <p>{card.interpretations}</p>
            </div>
        </div>
    );
}

export default OneCardDealView;


