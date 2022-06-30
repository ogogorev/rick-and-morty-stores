import { CHARACTERS_API } from "../consts";

export const getCharacters = (search?: string) => {
  const url = `${CHARACTERS_API}${search ? `/?name=${search}` : ``}`;
  return fetch(url).then((res) => res.json());
};
