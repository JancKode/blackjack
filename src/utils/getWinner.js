export const getWinner = (dealer, player) => {
  if (dealer.count > player.count) {
    return "dealer";
  } else if (dealer.count < player.count) {
    return "player";
  } else {
    return "push";
  }
};
