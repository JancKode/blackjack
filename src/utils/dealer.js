import { getCount } from "./getCount";
import { getRandomCard } from "./getRandomCard";

export const dealCards = (deck, aceValue) => {
  const playerCard1 = getRandomCard(deck);
  const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
  const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
  const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
  const dealerStartingHand = [dealerCard1.randomCard, {}];

  const player = {
    cards: playerStartingHand,
    count: getCount(playerStartingHand, "player", aceValue),
  };
  const dealer = {
    cards: dealerStartingHand,
    count: getCount(dealerStartingHand, "dealer"),
  };

  console.log("player", player);

  return { updatedDeck: playerCard2.updatedDeck, player, dealer };
};

export const dealerDraw = (dealer, deck, player) => {
  const { randomCard, updatedDeck } = getRandomCard(deck);
  dealer.cards.push(randomCard);
  dealer.count = getCount(dealer.cards, "dealer");
  return { dealer, updatedDeck };
};
