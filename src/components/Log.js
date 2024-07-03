export default function Log({ gameTurns }) {
  return (
    // <div>HELLO</div>
    <ol id="log">
      {gameTurns.map((turn) => (
        <li key={`${turn.square.rowIndex}${turn.square.colIndex}`}>
          {turn.player.name} has selected square {turn.square.rowIndex + 1},{" "}
          {turn.square.colIndex + 1}
        </li>
      ))}
    </ol>
  );
}
