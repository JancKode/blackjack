import { CARDCOUNT } from "./constants";

export const getCount = (cards, player, aceValue) => {
  const rearranged = [];
  cards.forEach((card) => {
    if (card.number === "A") {
      rearranged.push(card);
    } else if (card.number) {
      rearranged.unshift(card);
    }
  });

  return rearranged.reduce((total, card) => {
    if (card.number === "J" || card.number === "Q" || card.number === "K") {
      return total + 10;
    } else if (card.number === "A" && player === "dealer") {
      return total + 11 <= CARDCOUNT.TWENTYONE ? total + 11 : total + 1;
    } else if (card.number === "A" && player === "player") {
      return total + aceValue <= CARDCOUNT.TWENTYONE
        ? total + aceValue
        : total + 1;
    } else {
      return total + card.number;
    }
  }, 0);
};
