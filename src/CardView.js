import React from 'react';

function CardView({ card, showCard, redrawCounter }) {
    const imageUrl = `${process.env.PUBLIC_URL}/images/${card.imageName}.png`; // Updated image URL

    return (
        <div>
            <img src={imageUrl} alt={card.name} className="card-animation" style={{ width: 300, height: 300, transform: `rotateY(${showCard ? '0' : '180'}deg)` }} />
            <h2>{card.name}</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <p>{card.interpretations}</p>
            </div>
        </div>
    );
}

export default CardView;
