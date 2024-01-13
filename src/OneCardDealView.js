import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton'; // Assuming you have a TarotButton component
import './OneCardDealView.css';

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
                drawCard(); // Draw a card as soon as the data is loaded
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const drawCard = () => {
        if (!
            cards.length) return; // Prevent drawing if cards haven't been loaded
            setShowCard(false);
            const newCard = cards[Math.floor(Math.random() * cards.length)];
            setDrawnCard(newCard);
            setRedrawCounter(prevCounter => prevCounter + 1);
            };
    

            const saveEntry = () => {
                // Implement saving functionality here
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
    setShowCard(true);
    }, [redrawCounter]);
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

export function CardView({ card, showCard, redrawCounter }) {
    useEffect(() => {
        setShowCard(true);
    }, [redrawCounter]);

    return (
        <div>
            <img src={`/images/${card.imageName}`} alt={card.name} className="card-animation" style={{ width: 300, height: 300, transform: `rotateY(${showCard ? '0' : '180'}deg)` }} />
            <h2>{card.name}</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <p>{card.interpretations}</p>
            </div>
        </div>
    )
} ;
    


