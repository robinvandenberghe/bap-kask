import Message from "../models/Message";
import Api from "../api";
import { computed, decorate, observable, action, configure } from "mobx";

configure({ enforceActions: `observed` });
class ConversationStore {
  conversations = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`conversations`);
  }

  getAll = () => {
    this.api.getAll().then(d => {
      const recipients = [...new Set(d.map(item => { return { user: item.recipient};  }))];
      const senders = [...new Set(d.map(item => { return { user: item.sender}; }))];
      const people = [...new Set([...recipients ,...senders])];
       
      d.forEach(this._addProject);
    } );
  };

  newMessage = data => {
    const newMessage = new Message();
    newMessage.updateFromServer(data);
    this.projects.push(newMessage);
    this.api
      .create(newMessage)
      .then(projectValues => newMessage.updateFromServer(projectValues));
  };

  _addProject = values => {
    console.log(values);
    const message = new Message();
    message.updateFromServer(values);
    runInAction(() => this.conversations.push(project));
  };

  updateProject = project => {
    this.api
      .update(project)
      .then(projectValues => project.updateFromServer(projectValues));
  };

  get total() {
    if (this.conversations) {
      return this.conversations.length
    }
    return 0;
  }
}
decorate(ConversationStore, {
  conversations: observable,
  total: computed
});

export default ConversationStore;
