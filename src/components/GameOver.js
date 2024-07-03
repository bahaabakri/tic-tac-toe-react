export default function GameOver({ winner, onRematchTheGame }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>The Winner is {winner}</p>}
      {!winner && <p>It's a draw</p>}
      <button onClick={onRematchTheGame}>Rematch</button>
    </div>
  );
}
