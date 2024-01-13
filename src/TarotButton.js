import React from 'react';
import { Link } from 'react-router-dom';
import './TarotButton.css'; // Assuming you have a CSS file for styling

function TarotButton({ title, destination }) {
    return (
        <Link to={destination} className="tarot-button">
            {title}
        </Link>
    );
}

export default TarotButton;
