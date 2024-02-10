import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';
import './GalleryView.css'; // Assuming you have a CSS file for GalleryView

const categories = [
  { name: 'All Tarot Cards', filter: (card) => card.id <= 77 },
  { name: 'Major Arcana', filter: (card) => card.id <= 21 }, // Changed "Higher Arcana" to "Major Arcana"
  { name: 'Wands', filter: (card) => card.id >= 22 && card.id <= 35 },
  { name: 'Cups', filter: (card) => card.id >= 36 && card.id <= 49 },
  { name: 'Swords', filter: (card) => card.id >= 50 && card.id <= 63 },
  { name: 'Pentacles', filter: (card) => card.id >= 64 && card.id <= 77 },
];

function GalleryView({ goBack }) { // Accept goBack as a prop
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/TarotCards.json`)
      .then((response) => response.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <TarotButton title="Back to Main" onClick={goBack} /> {/* Add this line for the global "Back" button */}
      {selectedCategory ? (
        <>
          <TarotButton title="Back to Categories" onClick={() => setSelectedCategory('')} /> {/* Local back button */}
          {filteredCards.map((card) => (
            <div key={card.id}>
              <img src={`${process.env.PUBLIC_URL}/images/${card.imageName}.png`} alt={card.name} />
              <h3>{card.name}</h3>
              <p>{card.interpretations}</p>
            </div>
          ))}
        </>
      ) : (
        categories.map((category) => (
          <TarotButton key={category.name} title={category.name} onClick={() => handleCategorySelect(category.name)} />
        ))
      )}
    </div>
  );
}

export default GalleryView;