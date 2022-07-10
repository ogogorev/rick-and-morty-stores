import { FC } from "react";
import { observer } from "mobx-react-lite";

import "./Characters.css";

import { CharactersStore } from "../stores/Characters";
import { FavIdsStore } from "../stores/FavIds";
import { CharacterList } from "./CharacterLIst/CharacterList";
import { Search } from "./Search/Search";
import { UiStore } from "../stores/Ui";

type Props = {
  charactersStore: CharactersStore;
  favIdsStore: FavIdsStore;
  uiStore: UiStore;
};

export const Characters: FC<Props> = observer<Props>(
  ({ charactersStore, favIdsStore, uiStore }) => {
    const { characters, favCharacters, loading } = charactersStore;
    const { tab } = uiStore;

    console.log({ charactersStore, favIdsStore });

    const handleFavChange = (id: number, fav: boolean) => {
      /**
       * ISSUE #3:
       * Two stores are called. Possible solutions:
       * - Keep charactersStore.updateFav.
       *   FavIdsStore will be updated from CharactersStore implicitly.
       * - Update favIds only.
       *   Create domain object for Character and react to favIds changes.
       *   But this is not allowed (update obervable from reaction)
       */
      if (fav) {
        favIdsStore.add(id);
      } else {
        favIdsStore.remove(id);
      }
      charactersStore.updateFav(id, fav);
    };

    const handleSearch = (searchTerm: string) => {
      uiStore.updateSearchTerm(searchTerm);
    };

    const allTabActive = tab === "all";
    const favTabActive = tab === "favs";

    return (
      <div className="characters-page-container">
        <Search onSearch={handleSearch} />

        <div className="tabs">
          <button
            className={allTabActive ? "active" : ""}
            onClick={() => uiStore.selectAllTab()}
          >
            All
          </button>
          <button
            className={favTabActive ? "active" : ""}
            onClick={() => uiStore.selectFavsTab()}
          >
            Favs
          </button>
        </div>

        {loading && <div className="loading">Loading</div>}

        {allTabActive && (
          <CharacterList
            characters={characters}
            onFavChange={handleFavChange}
          />
        )}

        {favTabActive && (
          <CharacterList
            characters={favCharacters}
            onFavChange={handleFavChange}
          />
        )}
      </div>
    );
  }
);
