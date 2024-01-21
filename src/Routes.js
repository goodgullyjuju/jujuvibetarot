import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OneCardDealView from './OneCardDealView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OneCardDealView />} />
        // You can add more routes here if you have other components or pages
      </Routes>
    </div>
  );
}

export default App;

