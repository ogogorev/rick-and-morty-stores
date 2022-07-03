import { Character } from "./types";

export const markFavCharacters = (
  characters: Character[] | null,
  favIds: number[]
): Character[] | null => {
  return (
    characters?.map((character) =>
      setCharacterFav(character, favIds.includes(character.id))
    ) || null
  );
};

export const setCharacterFav = (character: Character, fav: boolean) => ({
  ...character,
  fav,
});

export const isFav = (ch: Character) => ch.fav;
