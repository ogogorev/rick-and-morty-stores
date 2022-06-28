import { useEffect, useState } from "react";

import "./Characters.css";

import { isFav, markFavCharacters } from "./helpers";
import { CHARACTERS_API } from "./consts";
import { Character, Tab } from "./types";
import { CharacterList } from "./CharacterLIst/CharacterList";
import { Search } from "./Search/Search";

const getCharacters = (search?: string) => {
  const url = `${CHARACTERS_API}${search ? `/?name=${search}` : ``}`;
  return fetch(url).then((res) => res.json());
};

export const Characters = () => {
  const [favIds, setFavIds] = useState<number[]>([1, 3]);

  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState(false);

  const loadCharacters = (search?: string) => {
    setCharacters(undefined);
    setLoading(true);

    getCharacters(search)
      .then(({ results }) => {
        setCharacters(markFavCharacters(results, favIds));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCharacters();
  }, []);

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

  const handleSearch = (searchTerm: string) => {
    loadCharacters(searchTerm);
  };

  return (
    <div className="characters-page-container">
      <Search onSearch={handleSearch} />

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

      {loading && <div className="loading">Loading</div>}

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
