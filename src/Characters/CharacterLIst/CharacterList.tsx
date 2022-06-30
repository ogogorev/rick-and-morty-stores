import { FC } from "react";

import "./CharacterList.css";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Character } from "../types";

type Props = {
  characters: Character[] | null;
  onFavChange: (id: number, fav: boolean) => void;
};

export const CharacterList: FC<Props> = ({ characters, onFavChange }) => {
  return (
    <div className="characters">
      {characters &&
        characters.length &&
        characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onFavChange={onFavChange}
          />
        ))}
    </div>
  );
};
