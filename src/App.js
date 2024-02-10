import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OneCardDealView from './OneCardDealView';
import ThreeCardDealView from './ThreeCardDealView';
import CelticCrossSpreadView from './CelticCrossSpreadView';
import GalleryView from './GalleryView';
import JournalView from './JournalView';
import ContentView from './ContentView';
// Assuming CardView and TarotCard are used within specific views, not as standalone routes

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ContentView />} />
        <Route path="/draw-one-card" element={<OneCardDealView />} />
        <Route path="/draw-three-cards" element={<ThreeCardDealView />} />
        <Route path="/celtic-cross-spread" element={<CelticCrossSpreadView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/journal" element={<JournalView />} />
        {/* Add more routes here if necessary */}
      </Routes>
    </div>
  );
}

export default App;
