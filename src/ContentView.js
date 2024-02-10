import React, { useState } from 'react';
import TarotButton from './TarotButton'; // Ensure this is the correct path
import OneCardDealView from './OneCardDealView';
import ThreeCardDealView from './ThreeCardDealView';
import CelticCrossSpreadView from './CelticCrossSpreadView';
import GalleryView from './GalleryView';
import JournalView from './JournalView';
function ContentView() {
    const [currentView, setCurrentView] = useState('');

    const renderView = () => {
        switch (currentView) {
            case 'drawOne':
                return <OneCardDealView />;
            case 'drawThree':
                return <ThreeCardDealView />;
            case 'celticCross':
                return <CelticCrossSpreadView />;
            case 'gallery':
                return <GalleryView />;
            case 'journal':
                return <JournalView />;
            default:
                return (
                    <div>
                        <h1>Welcome to JujuVibeTarot</h1>
                        <TarotButton title="Draw A Card" onClick={() => setCurrentView('drawOne')} />
                        <TarotButton title="Draw 3 Cards" onClick={() => setCurrentView('drawThree')} />
                        <TarotButton title="Celtic Cross Spread" onClick={() => setCurrentView('celticCross')} />
                        <TarotButton title="Gallery" onClick={() => setCurrentView('gallery')} />
                        <TarotButton title="Journal" onClick={() => setCurrentView('journal')} />
                    </div>
                );
        }
    };

    return (
        <div>
            {renderView()}
        </div>
    );
}

export default ContentView;
