import "./ItemCard.css";

export default function ItemCard({ card, onCardClick }) {
  return (
    <li className="itemcard__container">
      <h2 className="itemcard__name">{card.name}</h2>
      <img
        onClick={() => {
          onCardClick(card);
        }}
        className="itemcard__image"
        src={card.link}
        alt={card.name}
      />
    </li>
  );
}
