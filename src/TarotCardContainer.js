import React, { useState, useEffect } from 'react';

function TarotCardContainer() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('/TarotCards.json')
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {/* Render your cards based on the 'cards' state */}
        </div>
    );
}

export default TarotCardContainer;
