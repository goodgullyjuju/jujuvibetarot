import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OneCardDealView from './OneCardDealView';
import CardView from './CardView';
import ContentView from './ContentView';
import TarotCard from './TarotCard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OneCardDealView />} />
        <Route path="/" element={<CardView />} />
        <Route path="/" element={<ContentView />} />
        <Route path="/" element={<TarotCard />} />
        {/* Add more routes here if necessary */}
      </Routes>
    </div>
  );
}

export default App;

