import { useState } from "react";

export default function PlayerInfo({
  intialName,
  symbol,
  active,
  handleChangePlayerName,
}) {
  const [isEditState, setEditState] = useState(false);
  const [playerName, setPlayerName] = useState(intialName);
  const changeEditState = () => {
    setEditState((prevEditState) => !prevEditState);
    handleChangePlayerName(symbol, playerName);
  };
  const changePlayerName = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={active ? "active" : undefined}>
      <span className="player">
        {isEditState ? (
          <input type="text" value={playerName} onChange={changePlayerName} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={changeEditState}>
        {!isEditState ? "Edit" : "Save"}
      </button>
    </li>
  );
}
