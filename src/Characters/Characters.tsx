import { useEffect } from "react";
import { useStore } from "effector-react";

import "./Characters.css";

import { CharacterList } from "./CharacterLIst/CharacterList";
import { Search } from "./Search/Search";

import { $characters, $loading, fetchCharactersFx } from "./store/characters";
import { favIdsChanged } from "./store/favIds";
import { $tab, allTabSelected, favsTabSelected } from "./store/tab";
import { $favCharacters } from "./store/favCharacters";
import { searchChanged } from "./store/search";

export const Characters = () => {
  const characters = useStore($characters);
  const favCharacters = useStore($favCharacters);
  const loading = useStore($loading);

  const tab = useStore($tab);

  console.log({ characters });

  useEffect(() => {
    fetchCharactersFx();
  }, []);

  const handleFavChange = (id: number, fav: boolean) => {
    favIdsChanged({ id, fav });
  };

  const handleSearch = (searchTerm: string) => {
    searchChanged(searchTerm);
  };

  const allTabActive = tab === "all";
  const favTabActive = tab === "favs";

  return (
    <div className="characters-page-container">
      <Search onSearch={handleSearch} />

      <div className="tabs">
        <button
          className={allTabActive ? "active" : ""}
          onClick={() => allTabSelected()}
        >
          All
        </button>
        <button
          className={favTabActive ? "active" : ""}
          onClick={() => favsTabSelected()}
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
