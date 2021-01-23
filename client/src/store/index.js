import ConversationStore from "./ConversationStore";
import ProjectStore from "./ConversationStore";
import UiStore from "./UiStore";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.projectStore = new ProjectStore(this);
    // this.conversationStore = new ConversationStore(this);
  }
}

export default new Store();
