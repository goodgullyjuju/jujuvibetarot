import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';
import './GalleryView.css'; // Assuming you have a CSS file for GalleryView

const categories = [
  { name: 'All Tarot Cards', filter: (card) => card.id <= 77 },
  { name: 'Major Arcana', filter: (card) => card.id <= 21 },
  { name: 'Wands', filter: (card) => card.id >= 22 && card.id <= 35 },
  { name: 'Cups', filter: (card) => card.id >= 36 && card.id <= 49 },
  { name: 'Swords', filter: (card) => card.id >= 50 && card.id <= 63 },
  { name: 'Pentacles', filter: (card) => card.id >= 64 && card.id <= 77 },
];

function GalleryView({ goBack }) {
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

  // Define filteredCards here based on the selectedCategory
  const filteredCards = selectedCategory
    ? cards.filter(categories.find((cat) => cat.name === selectedCategory)?.filter || (() => true))
    : [];

  return (
    <div>
      {/* Global "Back to Main" button */}
      <TarotButton title="Back to Main" onClick={goBack} />
      
      {selectedCategory ? (
        <>
          {/* Local "Back to Categories" button */}
          <TarotButton title="Back to Categories" onClick={() => setSelectedCategory('')} />
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
