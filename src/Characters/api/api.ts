import { CHARACTERS_API } from "../consts";

export const getCharacters = (search?: string) => {
  const url = `${CHARACTERS_API}${search ? `/?name=${search}` : ``}`;
  return fetch(url).then((res) => res.json());
};

export const getFavCharacters = (ids: number[], search?: string) => {
  if (ids.length < 1) return [];

  const url = `${CHARACTERS_API}/${ids.join(",")}${
    search ? `?name=${search}` : ``
  }`;
  return fetch(url).then((res) => res.json());
};
