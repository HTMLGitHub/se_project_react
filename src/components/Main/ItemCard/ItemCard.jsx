import "./ItemCard.css";

export default function ItemCard({card}) {
  return (
    <div className="itemcard__container">
      <h2 className="itemcard__name">{card.name}</h2>
      <img className="itemcard__image" src={card.link} alt={card.name} />
    </div>
  );
}
