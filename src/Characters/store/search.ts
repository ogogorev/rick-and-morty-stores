import { createEvent, restore } from "effector";

const searchChanged = createEvent<string>("Search changed");
const $search = restore(searchChanged, "");

export { $search, searchChanged };
