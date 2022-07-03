import { createStore, createEffect, combine, sample } from "effector";

import { getCharacters } from "../api/api";
import { markFavCharacters } from "../helpers";
import { Character } from "../types";
import { $favIds } from "./favIds";
import { $search, searchChanged } from "./search";
import { $tab, allTabSelected } from "./tab";

const fetchCharactersFx = createEffect(getCharacters);

const $charactersRaw = createStore<Character[] | null>(null);
$charactersRaw
  .on(fetchCharactersFx, () => null)
  .on(fetchCharactersFx.done, (_, { result }) => result.results)
  .on(fetchCharactersFx.fail, () => []);

const $characters = combine($charactersRaw, $favIds, markFavCharacters);

const $loading = createStore<boolean>(false);
$loading
  .on(fetchCharactersFx, () => true)
  .on(fetchCharactersFx.finally, () => false);

sample({
  source: { tab: $tab, search: $search },
  clock: [searchChanged, allTabSelected],
  target: fetchCharactersFx,
  filter: ({ tab }) => tab === "all",
  fn: ({ search }) => search,
});

export { $characters, $loading, fetchCharactersFx };
