import { makeAutoObservable } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";
import Message from "../models/Message";

class UiStore {
  authUser = null;
  conversations = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authService = new Auth();
    this.setUser(getUserFromCookie());
    makeAutoObservable(this);
  }

  setUser = value => (this.authUser = value);
  setConversations = value => (this.conversations = value);

  updateMessage = message => {
    this.authService
      .updateMessage(message)
      .then(projectValues => message.updateFromServer(projectValues));
  };

  getAllConversations = () => {
    this.authService.getAllMessages().then(d => {
      const recipients = [...new Set(d.map(item => item.recipient))];
      const senders = [...new Set(d.map(item => item.sender))];
      const people = [...new Set([...recipients ,...senders])];
      const convos = people.map((u)=>{
        const messages = d.filter((a)=>a.sender.id===u.id||a.recipient.id===u.id);
        return { user: u , messages };
      }) 
      this.setConversations(convos);
    } );
  };

  newMessage = data => {
    const newMessage = new Message();
    newMessage.updateFromServer(data);
    this.projects.push(newMessage);
    this.authService
      .createMessage(newMessage)
      .then(projectValues => newMessage.updateFromServer(projectValues));
  };

  login = (username, password) => {
    return this.authService
      .login(username, password)
      .then(() => {
        this.setUser(getUserFromCookie());
        Promise.resolve();
      })
      .catch(() => {
        this.setUser(null);
        Promise.reject();
      });
  };

  register = (name, email, pwd) => this.authService.register(name, email, pwd);

  logout = () => {
    this.authService.logout().then(() => this.setUser(null));
  };

  get conversationLength() {
    if (this.conversations) {
      return this.conversations.length
    }
    return 0;
  }
}

export default UiStore;
