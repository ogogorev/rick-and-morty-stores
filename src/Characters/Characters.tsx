import { useEffect, useState } from "react";

import { CharacterCard } from "./CharacterCard";
import { Character } from "./types";

const CHARACTERS_API = `https://rickandmortyapi.com/api/character`;

const getCharacters = () => {
  return fetch(CHARACTERS_API).then((res) => res.json());
};

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    getCharacters().then(({ results }) => {
      setCharacters(results);
    });
  }, []);

  return (
    <div>
      {characters &&
        characters.length &&
        characters.map((character) => <CharacterCard character={character} />)}
    </div>
  );
};
