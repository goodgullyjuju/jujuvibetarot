import React from 'react';
// Removed unused imports
import './TarotButton.css';

function TarotButton({ title, onClick }) {
    return (
        <button onClick={onClick} className="tarot-button">
            {title}
        </button>
    );
}

export default TarotButton;
