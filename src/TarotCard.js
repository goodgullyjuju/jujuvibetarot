function TarotCard({ card }) {
    const imageUrl = `/images/${card.imageName}.png`; // Using the `imageName` for the image file

    return (
        <div>
            <h3>{card.name}</h3>
            <img src={imageUrl} alt={card.name} className="card-animation" style={{ width: '300px', height: '300px' }} />
            <p>{card.interpretations}</p>
        </div>
    );
}

export default TarotCard;