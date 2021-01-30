import { makeAutoObservable } from "mobx";

import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";
import Message from "../models/Message";
import Api from "../api/index";
class UiStore {
  authUser = null;
  conversations = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authService = new Auth();
    this.setUser(getUserFromCookie());
    this.messageApi = new Api(`messages`);
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
    this.messageApi.getAll().then(d => {
      const recipients = [...new Set(d.map(item => item.recipient))];
      const senders = [...new Set(d.map(item => item.sender))];
      const people = [...new Set([...recipients ,...senders])];
      const convos = people.map((u)=>{
        const messages = d.filter((a)=>a.sender.id===u.id||a.recipient.id===u.id);
        return { user: u, messages };
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

  login = async (username, password) => {
    const r = await this.authService.login(username, password);
    if(r.success){
      this.setUser(getUserFromCookie());
      this.getAllConversations();
    }else{
      this.setUser(null);
    }
    return r;
  };

  register = (userObj) => {
    return this.authService.register(userObj).then(() => {
      this.setUser(getUserFromCookie());
      Promise.resolve();
    })
    .catch(() => {
      this.setUser(null);
      Promise.reject();
    });
  };

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
