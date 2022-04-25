import { CARDS, SUITS } from "./constants";

export const initializeDeck = () => {
  const deck = [];
  for (let i = 0; i < CARDS.length; i++) {
    for (let j = 0; j < SUITS.length; j++) {
      deck.push({ number: CARDS[i], suit: SUITS[j] });
    }
  }
  return deck;
};
