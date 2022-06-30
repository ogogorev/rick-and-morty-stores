import { Character } from "./types";

export const markFavCharacters = (
  characters: Character[] | null,
  favIds: number[]
): Character[] | null => {
  return (
    characters?.map((character) => ({
      ...character,
      fav: favIds.includes(character.id),
    })) || null
  );
};

export const isFav = (ch: Character) => ch.fav;
