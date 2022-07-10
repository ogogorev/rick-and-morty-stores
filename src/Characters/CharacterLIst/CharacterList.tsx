import { FC } from "react";
import { observer } from "mobx-react-lite";

import "./CharacterList.css";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Character } from "../types";

type Props = {
  characters: Character[] | null;
  onFavChange: (id: number, fav: boolean) => void;
};

export const CharacterList: FC<Props> = observer<Props>(
  ({ characters, onFavChange }) => {
    return (
      <div className="characters">
        {characters &&
          characters.length &&
          characters.map((character) => (
            /**
             * ISSUE #2:
             * List rerenders every time characters changes.
             * Every CharacterCard re-renders as well.
             * Can be fixed by wrapping CharacterCard in observer,
             * but this would make CharacterCard depeding on mobx
             */
            <CharacterCard
              key={character.id}
              character={{ ...character }}
              onFavChange={onFavChange}
            />
          ))}
      </div>
    );
  }
);
