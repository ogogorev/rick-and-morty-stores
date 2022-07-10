import { makeAutoObservable } from "mobx";
import { Tab } from "../Characters/types";

export class UiStore {
  searchTerm: string = "";
  tab: Tab = "all";

  constructor() {
    makeAutoObservable(this);
  }

  updateSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  selectAllTab() {
    this.tab = 'all';
  }

  selectFavsTab() {
    this.tab = 'favs';
  }
}
