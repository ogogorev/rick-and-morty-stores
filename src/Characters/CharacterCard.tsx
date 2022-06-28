import { FC } from "react";

import { Character } from "./types";

type Props = {
  character: Character;
};

export const CharacterCard: FC<Props> = ({ character }) => {
  const { name } = character;

  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};
