import ProjectStore from "./ProjectStore";
import UiStore from "./UiStore";

class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
  }
}

export default RootStore;
