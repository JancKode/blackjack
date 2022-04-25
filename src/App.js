import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Button from "./components/Button/Button";
import { initializeDeck } from "./utils/initializeDeck";
import { getRandomCard } from "./utils/getRandomCard";
import { getCount } from "./utils/getCount";
import { getWinner } from "./utils/getWinner";
import { CARDCOUNT, INITIALSTATE } from "./utils/constants";
import { dealCards, dealerDraw } from "./utils/dealer";

function App() {
  const [gameState, setGameState] = useState(INITIALSTATE);
  const [aceValue, setAceValue] = useState(0);

  const startNewGame = (type, aceValue) => {
    if (type === "continue") {
      const deck =
        gameState.deck.length < 10 ? initializeDeck() : gameState.deck;
      const { updatedDeck, player, dealer } = dealCards(deck, aceValue);

      setGameState({
        ...gameState,
        deck: updatedDeck,
        dealer,
        player,
        gameOver: false,
        message: null,
      });
    } else if (type === "new") {
      setAceValue(0);
      const deck = initializeDeck();
      const { updatedDeck, player, dealer } = dealCards(deck, aceValue);

      setGameState({
        ...gameState,
        deck: updatedDeck,
        dealer,
        player,
        gameOver: false,
        message: null,
      });
    } else {
      const deck = initializeDeck();
      const { updatedDeck, player, dealer } = dealCards(deck, aceValue);

      setGameState({
        ...gameState,
        deck: updatedDeck,
        dealer,
        player,
        gameOver: false,
        message: null,
      });
    }
  };

  useEffect(() => {
    if (aceValue !== 0) {
      startNewGame();
    }
  }, [aceValue]);

  const handleHitAction = () => {
    if (!gameState.gameOver) {
      const { randomCard, updatedDeck } = getRandomCard(gameState.deck);
      const player = gameState.player;
      player.cards.push(randomCard);
      player.count = getCount(player.cards, "player", aceValue);

      if (player.count > CARDCOUNT.TWENTYONE) {
        setGameState({
          ...gameState,
          player,
          gameOver: true,
          message: "BUST!",
        });
      } else {
        setGameState({ ...gameState, deck: updatedDeck, player });
      }
    } else {
      setGameState({
        ...gameState,
        message: "Game over! Please click on continue or start a new game.",
      });
    }
  };

  const handleStandAction = () => {
    if (!gameState.gameOver) {
      //Show dealer's 2nd card
      const randomCard = getRandomCard(gameState.deck);
      let deck = randomCard.updatedDeck;
      let dealer = gameState.dealer;
      const player = gameState.player;
      player.count = getCount(player.cards, "player", aceValue);
      dealer.cards.pop();
      dealer.cards.push(randomCard.randomCard);
      dealer.count = getCount(dealer.cards, "dealer");

      // Keep drawing cards until count is 17 or more
      while (dealer.count < CARDCOUNT.SEVENTEEN) {
        const draw = dealerDraw(dealer, deck, "dealer");
        dealer = draw.dealer;
        deck = draw.updatedDeck;
      }

      if (dealer.count > CARDCOUNT.TWENTYONE) {
        setGameState({
          deck,
          dealer,
          wallet: gameState.wallet + gameState.currentBet * 2,
          gameOver: true,
          message: "Dealer bust! You win!",
          player,
        });
      } else {
        const winner = getWinner(dealer, gameState.player);
        let message;

        if (winner === "dealer") {
          message = "Dealer wins...";
        } else if (winner === "player") {
          message = "You win!";
        } else {
          message = "Push.";
        }

        setGameState({
          ...gameState,
          deck,
          dealer,
          gameOver: true,
          message,
        });
      }
    } else {
      setGameState({
        ...gameState,
        message: "Game over! Please start a new game.",
      });
    }
  };

  const renderPlayerScore = (title, score) => {
    return (
      <p className="player-score">
        {title} {score}
      </p>
    );
  };

  const handleSelectChange = (value) => {
    setAceValue(value);
  };

  const renderSelect = () => {
    return (
      <select
        value={aceValue}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option>Select...</option>
        <option value={1}>1</option>
        <option value={11}>11</option>
      </select>
    );
  };

  return (
    <div className="App">
      {aceValue === 0 ? (
        <>
          <p className="game-status">
            Please select a value for the Player's Ace before starting:
          </p>
          {renderSelect()}
        </>
      ) : (
        <>
          {" "}
          {gameState.message ? (
            <p className="game-status">{gameState.message}</p>
          ) : null}
          {renderPlayerScore("In your hand:", gameState.player?.count)}
          <table className="cards">
            <tbody>
              <tr>
                {gameState.player?.cards?.map((card, i) => {
                  return (
                    <Cards key={i} number={card.number} suit={card.suit} />
                  );
                })}
              </tr>
            </tbody>
          </table>
          {renderPlayerScore("On Dealer's Hand:", gameState.dealer?.count)}
          <table className="cards">
            <tbody>
              <tr>
                {gameState.dealer?.cards?.map((card, i) => {
                  return (
                    <Cards key={i} number={card.number} suit={card.suit} />
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <Button title="New Game" onClick={() => startNewGame("new")} />
            <Button title="Hit" onClick={() => handleHitAction()} />
            <Button title="Stand" onClick={() => handleStandAction()} />
            {gameState.gameOver ? (
              <Button
                title="continue"
                onClick={() => startNewGame("continue")}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
