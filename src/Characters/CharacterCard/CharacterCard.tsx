import { FC } from "react";

import { Character } from "../types";
import "./CharacterCard.css";

type Props = {
  character: Character;
};

export const CharacterCard: FC<Props> = ({ character }) => {
  const { name, gender } = character;

  return (
    <div className="character">
      <h2>{name}</h2>

      <span className="gender">{gender}</span>
    </div>
  );
};
