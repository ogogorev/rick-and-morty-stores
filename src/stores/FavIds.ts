import { makeAutoObservable } from "mobx";

export class FavIdsStore {
  favIds = [1, 3];

  constructor() {
    makeAutoObservable(this);
  }

  add(id: number) {
    this.favIds.push(id);
  }

  remove(id: number) {
    this.favIds.splice(this.favIds.indexOf(id), 1);
  }
}
