import { Character } from "./types";

export const markFavCharacters = (
  characters: Character[],
  favIds: number[]
) => {
  return characters.map((character) => ({
    ...character,
    fav: favIds.includes(character.id),
  }));
};

export const isFav = (ch: Character) => ch.fav;
