import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OneCardDealView from './OneCardDealView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OneCardDealView />} />
        {/* Add more routes here if necessary */}
      </Routes>
    </div>
  );
}

export default App;

