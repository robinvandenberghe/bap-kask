import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";
import EventStore from "./EventStore";
import { makeAutoObservable } from "mobx";
class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    this.eventStore = new EventStore(this);
    makeAutoObservable(this);
  }
}

export default RootStore;
