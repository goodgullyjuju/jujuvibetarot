import React, { useState, useEffect, useCallback } from 'react';
import TarotButton from './TarotButton';
import './OneCardDealView.css';
import CardView from './CardView'; 

function OneCardDealView() {
    const [cards, setCards] = useState([]);
    const [drawnCard, setDrawnCard] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [redrawCounter, setRedrawCounter] = useState(0);
    const [showingSaveAlert, setShowingSaveAlert] = useState(false);

    // Memoize the drawCard function
    const drawCard = useCallback(() => {
        if (cards.length === 0) return;
        setShowCard(false);
        const newCard = cards[Math.floor(Math.random() * cards.length)];
        setDrawnCard(newCard);
        setRedrawCounter(prevCounter => prevCounter + 1);
    }, [cards]); // Dependency for useCallback

    useEffect(() => {
        fetch('/TarotCards.json')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                drawCard(); // Directly call drawCard without passing data
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [drawCard]); // Include drawCard in the dependency array of useEffect

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

export default OneCardDealView;
