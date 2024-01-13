import React from 'react';

function TarotCard({ cardName }) {
    // Format the card name to match the file naming convention
    const formatImageName = (name, size) => {
        return `/images/tarot/${name} (${size} x ${size} px).png`;
    };

    return (
        <picture>
            <source srcSet={formatImageName(cardName, 300)} media="(min-width: 1200px)" />
            <source srcSet={formatImageName(cardName, 200)} media="(min-width: 600px)" />
            <img src={formatImageName(cardName, 100)} alt={cardName} />
        </picture>
    );
}

export default TarotCard;
