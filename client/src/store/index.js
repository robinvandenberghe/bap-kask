import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";

class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    this.projectStore.getAll();
  }
}

export default RootStore;
