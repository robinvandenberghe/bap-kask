import { makeAutoObservable, action } from "mobx";

import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";
import Message from "../models/Message";
import Api from "../api/index";
class UiStore {
  authUser = null;
  conversations = [];
  savedWorks = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authService = new Auth();
    this.setUser(getUserFromCookie());
    this.messageApi = new Api(`messages`);
    if(this.authUser){
      this.getAllSavedWorks();
      this.getAllConversations();
    }
    makeAutoObservable(this);
  }

  setUser = value => (this.authUser = value);
  setConversations = value => (this.conversations = value);
  setSavedWorks = value => (this.savedWorks = value);

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

  getAllSavedWorks =  () => {
    this.authService.getAllSavedWorks().then(action(d => {
      const w = d.map((item)=>item.projectId);
      this.setSavedWorks(w);
    }))
  }

  newMessage = data => {
    const newMessage = new Message();
    newMessage.updateFromServer(data);
    this.projects.push(newMessage);
    this.authService
      .createMessage(newMessage)
      .then(projectValues => newMessage.updateFromServer(projectValues));
  };

  saveWork = async (id) => {
    const r = await this.authService.saveWork(this.authUser.id, id);
    if(r.success){
      const index = this.savedWorks.indexOf(id);
      if(index!==-1){
        this.savedWorks.splice(index,1);
        return { success:true, saved:false };
      }else{
        this.savedWorks.push(id);
        return { success:true, saved:true };
      }
    }
  }

  login = async (username, password) => {
    const r = await this.authService.login(username, password);
    if(r.success){
      this.setUser(getUserFromCookie());
      this.getAllSavedWorks();
      this.getAllConversations();
    }else{
      this.setUser(null);
    }
    return r;
  };

  register = async (userObj) => {
    const r = await this.authService.register(userObj);
    if(r.success){
      this.setUser(getUserFromCookie());
      this.getAllConversations();
    }else{
      this.setUser(null);
    }
    return r;
  };

  logout = () => {
    this.authService.logout().then(() => {
      this.setSavedWorks([]);
      this.setConversations([]);
      this.setUser(null);
    });
  };

  get conversationLength() {
    if (this.conversations) {
      return this.conversations.length
    }
    return 0;
  }
  get savedWorksLength() {
    if (this.savedWorks) {
      return this.savedWorks.length
    }
    return 0;
  }
}

export default UiStore;
