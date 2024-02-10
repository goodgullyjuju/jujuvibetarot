import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton'; // Assuming this is a reusable button component

const categories = [
  { name: 'All Tarot Cards', filter: (card) => card.id <= 77 },
  { name: 'Higher Arcana', filter: (card) => card.id <= 21 },
  { name: 'Wands', filter: (card) => card.id >= 22 && card.id <= 35 },
  { name: 'Cups', filter: (card) => card.id >= 36 && card.id <= 49 },
  { name: 'Swords', filter: (card) => card.id >= 50 && card.id <= 63 },
  { name: 'Pentacles', filter: (card) => card.id >= 64 && card.id <= 77 },
];

function GalleryView() {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('path/to/TarotCards.json')
      .then((response) => response.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredCards = cards.filter(categories.find((cat) => cat.name === selectedCategory)?.filter || (() => true));

  return (
    <div>
      {selectedCategory ? (
        <>
          <TarotButton title="Back" onClick={() => setSelectedCategory('')} />
          {filteredCards.map((card) => (
            <div key={card.id}>
              <img src={`path/to/images/${card.imageName}.jpg`} alt={card.name} />
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
