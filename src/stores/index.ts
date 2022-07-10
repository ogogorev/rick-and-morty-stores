import { CharactersStore } from "./Characters";
import { FavIdsStore } from "./FavIds";
import { UiStore } from "./Ui";

const favIdsStore = new FavIdsStore();
const uiStore = new UiStore();
const charactersStore = new CharactersStore(favIdsStore, uiStore);

export { charactersStore, favIdsStore, uiStore };
