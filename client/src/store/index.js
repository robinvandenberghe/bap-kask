import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";
import { makeAutoObservable } from "mobx";
class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    makeAutoObservable(this);
  }
}

export default RootStore;
