import React from 'react';

function TarotCard({ card }) {
    // Format the card name to match the file naming convention
    // Replace spaces and special characters as needed to match the image file names
    const formattedName = card.name.replace(/ /g, ''); // Example: replaces spaces with nothing
    const imageUrl = `/images/tarot/${formattedName}.png`;

    return (
        <div>
            <h3>{card.name}</h3>
            <img src={imageUrl} alt={card.name} />
            <p>{card.interpretations}</p>
        </div>
    );
}

export default TarotCard;

