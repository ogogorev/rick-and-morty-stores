import { createEffect, createStore, sample } from "effector";
import { getFavCharacters } from "../api/api";
import { setCharacterFav } from "../helpers";
import { Character } from "../types";
import { $favIds, favIdsChanged } from "./favIds";
import { $search, searchChanged } from "./search";
import { $tab, favsTabSelected } from "./tab";

const fetchFavCharactersFx = createEffect(
  ({ favIds, search }: { favIds: number[]; search?: string }) =>
    getFavCharacters(favIds, search)
);

const $favCharacters = createStore<Character[] | null>(null)
  .on(fetchFavCharactersFx, () => null)
  .on(fetchFavCharactersFx.done, (_, { result }) => {
    if (!Array.isArray(result)) result = [result];
    return result.map((ch: Character) => setCharacterFav(ch, true));
  })
  .on(fetchFavCharactersFx.fail, () => [])
  .on(favIdsChanged, (favCharacters, { id, fav }) => {
    if (!favCharacters) return favCharacters;

    const foundChI = favCharacters.findIndex((ch) => ch.id === id);

    if (foundChI < 0) return favCharacters;

    const newFavCharacters = [...favCharacters];
    newFavCharacters.splice(foundChI, 1, { ...favCharacters[foundChI], fav });
    return newFavCharacters;
  });

// TODO: Add loading indicator for the request

sample({
  source: { $search, $tab, $favIds },
  clock: [favsTabSelected, searchChanged],
  filter: ({ $tab }) => $tab === "favs",
  fn: ({ $favIds, $search }) => ({ favIds: $favIds, search: $search }),
  target: fetchFavCharactersFx,
});

export { $favCharacters, fetchFavCharactersFx };
