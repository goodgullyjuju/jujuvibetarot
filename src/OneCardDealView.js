import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';
import './OneCardDealView.css';
import CardView from './CardView'; 

function OneCardDealView() {
    const [cards, setCards] = useState([]);
    const [drawnCard, setDrawnCard] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [redrawCounter, setRedrawCounter] = useState(0);
    const [showingSaveAlert, setShowingSaveAlert] = useState(false);

    useEffect(() => {
        fetch('/TarotCards.json')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                drawCard(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const drawCard = (tarotCards = cards) => {
        if (tarotCards.length === 0) return;
        setShowCard(false);
        const newCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
        setDrawnCard(newCard);
        setRedrawCounter(prevCounter => prevCounter + 1);
    };

    const saveEntry = () => {
        setShowingSaveAlert(true);
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
            {drawnCard && (
                <>
                    <CardView card={drawnCard} showCard={showCard} redrawCounter={redrawCounter} />
                    <TarotButton title="Draw Another Card" onClick={() => drawCard()} />
                    <TarotButton title="Save Entry" onClick={saveEntry} />
                </>
            )}
            {!drawnCard && <TarotButton title="Draw a Card" onClick={() => drawCard()} />}
            {showingSaveAlert && <div>Saved! Your card has been saved to the journal.</div>}
        </div>
    );
}

export default OneCardDealView;
