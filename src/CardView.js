import React from 'react';

function CardView({ card, showCard, redrawCounter }) {
    const imageUrl = `${process.env.PUBLIC_URL}/images/${card.imageName}.png`;



    return (
        <div>
        <img 
          src={imageUrl} 
          alt={card.name} 
          className="card-animation" 
          style={{ width: 300, height: 300, transform: `rotateY(${showCard ? '0' : '180'}deg)` }}
          onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/placeholderImage.png'}}  
        />
            {/* rest of your card component */}
        </div>
    );
}

export default CardView;
