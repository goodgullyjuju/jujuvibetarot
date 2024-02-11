import React, { useState, useEffect } from 'react';
import TarotButton from './TarotButton';
import './GalleryView.css'; // Make sure this file is correctly linked

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/TarotCards.json`)
      .then(response => response.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (imageName) => {
    setSelectedImage(`${process.env.PUBLIC_URL}/images/${imageName}.png`);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TarotButton title="Back to Main" onClick={goBack} />
      {selectedCategory ? (
        <>
          <TarotButton title="Back to Categories" onClick={() => setSelectedCategory('')} />
          {cards.filter(categories.find(cat => cat.name === selectedCategory)?.filter || (() => true)).map((card) => (
            <div key={card.id} className="cardContainer" onClick={() => handleImageClick(card.imageName)}>
              <img src={`${process.env.PUBLIC_URL}/images/${card.imageName}.png`} alt={card.name} className="cardImage" />
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
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="closeModalButton" onClick={closeModal}>X</span>
          <img src={selectedImage} alt="Enlarged tarot card" className="modalImage" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default GalleryView;
