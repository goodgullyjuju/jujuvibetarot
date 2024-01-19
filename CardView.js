import React, { useEffect } from 'react';

function CardView({ card, showCard, redrawCounter }) {
    // Removed setShowCard from useEffect since it's not defined here

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

export default CardView;
