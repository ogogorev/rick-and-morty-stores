import { createEvent, createStore } from "effector";

type FavIdsChangePayload = {
  id: number;
  fav: boolean;
};

const favIdsChanged = createEvent<FavIdsChangePayload>("FavIds changed");

const $favIds = createStore<number[]>([1, 3]);
$favIds.on(favIdsChanged, (favIds, { id, fav }) =>
  fav ? [...favIds, id] : favIds.filter((favId) => favId !== id)
);

export { $favIds, favIdsChanged };
