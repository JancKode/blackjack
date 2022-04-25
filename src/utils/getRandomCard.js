export const getRandomCard = (deck) => {
  const updatedDeck = deck;
  const randomIndex = Math.floor(Math.random() * updatedDeck.length);
  const randomCard = updatedDeck[randomIndex];
  updatedDeck.splice(randomIndex, 1);
  return { randomCard, updatedDeck };
};
