import { autorun, makeAutoObservable, reaction, runInAction } from "mobx";

import { getCharacters, getFavCharacters } from "../api/api";
import { FavIdsStore } from "./FavIds";
import { UiStore } from "./Ui";
import { markFavCharacters, setCharacterFav } from "../Characters/helpers";
import { Character } from "../Characters/types";

/**
 * TODO:
 * - Character should be a domain object
 * - FavIds might be a domain object as well
 */

export class CharactersStore {
  characters: Character[] | null = null;
  loading: boolean = false;
  favCharacters: Character[] | null = null;

  favIdsStore: FavIdsStore | null = null;
  uiStore: UiStore | null = null;

  constructor(favIdsStore: FavIdsStore, uiStore: UiStore) {
    makeAutoObservable(this);

    this.favIdsStore = favIdsStore;
    this.uiStore = uiStore;

    this.initReactions();
  }

  initReactions() {
    // ISSUE #1: Not allowed to modify observables in reaction.
    autorun(() => {
      if (this.uiStore?.tab === "all") this.fetchCharacters();
    });
    reaction(
      () => this.uiStore?.tab === "favs",
      (isFavTab: boolean) => {
        if (isFavTab) this.fetchFavCharacters();
      }
    );
  }

  async fetchCharacters() {
    this.loading = true;
    this.characters = null;

    try {
      const { results } = await getCharacters(this.uiStore?.searchTerm);
      runInAction(() => {
        this.characters = markFavCharacters(
          results,
          this.favIdsStore?.favIds || []
        );
        this.loading = false;
      });
    } catch (e) {}
  }

  async fetchFavCharacters() {
    this.loading = true;
    this.favCharacters = null;

    try {
      if (!this.uiStore || !this.favIdsStore) return;

      let result = await getFavCharacters(
        this.favIdsStore.favIds,
        this.uiStore.searchTerm
      );

      if (!Array.isArray(result)) result = [result];

      runInAction(() => {
        this.favCharacters = result.map((ch: Character) =>
          setCharacterFav(ch, true)
        );
        this.loading = false;
      });
    } catch (e) {}
  }

  updateFav(id: number, fav: boolean) {
    if (!this.uiStore) return;

    const characters =
      this.uiStore.tab === "all" ? this.characters : this.favCharacters;

    const foundCharacter = characters?.find((ch) => ch.id === id);

    if (!foundCharacter) return;

    foundCharacter.fav = fav;
  }
}

// export class CharacterDO {
//   id: number;
//   name: string = "";
//   gender: "Female" | "Male" | "Genderless" | "unknown" = "unknown";
//   fav: boolean = false;

//   constructor(id: number) {
//     makeAutoObservable(this);

//     this.id = id;
//   }

//   updateFav(fav: boolean) {
//     this.fav = fav;
//   }
// }
