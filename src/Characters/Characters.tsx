import { useEffect, useState } from "react";

import "./Characters.css";

import { isFav, markFavCharacters } from "./helpers";
import { CHARACTERS_API } from "./consts";
import { Character, Tab } from "./types";
import { CharacterList } from "./CharacterLIst/CharacterList";

const getCharacters = () => {
  return fetch(CHARACTERS_API).then((res) => res.json());
};

export const Characters = () => {
  const [favIds, setFavIds] = useState<number[]>([1, 3]);

  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    getCharacters().then(({ results }) => {
      setCharacters(markFavCharacters(results, favIds));
    });
  }, [favIds]);

  const favCharacters = characters?.filter(isFav);

  const handleFavChange = (id: number, fav: boolean) => {
    const newFavIds = fav
      ? [...favIds, id]
      : favIds.filter((favId) => favId !== id);

    characters && setCharacters(markFavCharacters(characters, newFavIds));
    setFavIds(newFavIds);
  };

  const [tab, setTab] = useState<Tab>("all");

  const selectTab = (tab: Tab) => {
    setTab(tab);
  };

  const allTabActive = tab === "all";
  const favTabActive = tab === "favs";

  return (
    <div className="characters-page-container">
      <div className="tabs">
        <button
          className={allTabActive ? "active" : ""}
          onClick={() => selectTab("all")}
        >
          All
        </button>
        <button
          className={favTabActive ? "active" : ""}
          onClick={() => selectTab("favs")}
        >
          Favs
        </button>
      </div>

      {allTabActive && (
        <CharacterList characters={characters} onFavChange={handleFavChange} />
      )}

      {favTabActive && (
        <CharacterList
          characters={favCharacters}
          onFavChange={handleFavChange}
        />
      )}
    </div>
  );
};
