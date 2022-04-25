import React from "react";
import "./Cards.styles.css";

const Cards = ({ number, suit }) => {
  const combo = number ? `${number}${suit}` : null;
  const color = suit === "♦" || suit === "♥" ? "card-red" : "card";

  return (
    <td className="card-border">
      <div className={color}>
        <span className="card-face">{combo}</span>
      </div>
    </td>
  );
};

export default Cards;
