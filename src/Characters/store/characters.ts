import { createStore, createEffect, combine } from "effector";

import { getCharacters } from "../api/api";
import { markFavCharacters } from "../helpers";
import { Character } from "../types";
import { $favIds } from "./favIds";

/**
 * TODO:
 *
 * - Abstract requests into own store (or find a library)
 *
 */

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

export { $characters, $loading, fetchCharactersFx };
