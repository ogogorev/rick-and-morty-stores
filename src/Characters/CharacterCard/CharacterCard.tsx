import { FC } from "react";

import { Character } from "../types";
import "./CharacterCard.css";

type Props = {
  character: Character;
  onFavChange: (id: number, fav: boolean) => void;
};

export const CharacterCard: FC<Props> = ({ character, onFavChange }) => {
  const { id, name, gender, fav } = character;

  const handleFavClick = () => {
    onFavChange(id, !fav);
  };

  return (
    <div className="character">
      <h2>{name}</h2>

      <span className="gender">{gender}</span>

      <button
        className={`fav-button ${fav ? "active" : ""}`}
        onClick={handleFavClick}
      ></button>
    </div>
  );
};
