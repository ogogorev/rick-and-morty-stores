import { createEvent, createStore } from "effector";

import { Tab } from "../types";

const allTabSelected = createEvent("All tab selected");
const favsTabSelected = createEvent("Favs tab selected");

const $tab = createStore<Tab>("all")
  .on(allTabSelected, () => "all")
  .on(favsTabSelected, () => "favs");

export { $tab, allTabSelected, favsTabSelected };
