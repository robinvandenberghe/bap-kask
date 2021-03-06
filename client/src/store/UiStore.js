import { makeAutoObservable, action, toJS } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";
import Message from "../models/Message";
import Api from "../api/index";
import User from "../models/User";
class UiStore {
  authUser = null;
  constructor(rootStore) {
    this.conversations = [];
    this.savedWorks = [];
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
      const c = d.map((item=>{
        const {id, senderId, senderName, senderSurname, senderProfileUrl, recipientId, recipientName, recipientSurname, recipientProfileUrl, sentAt, hasRead, message} = item;
        const m = new Message();
        m.updateFromServer({id, message, sentAt, hasRead, sender: new User(senderId, senderName, senderSurname, ``, ``, ``, senderProfileUrl), recipient: new User(recipientId, recipientName, recipientSurname, ``, ``, ``, recipientProfileUrl)});
        return m;
      }))
      const recipients = [...new Set(c.map(item => toJS(item.recipient.id)))];
      const senders = [...new Set(toJS(c.map(item => item.sender.id)))];
      const people = [...new Set([...recipients ,...senders])];
      const convos = people.filter(u=>u!==this.authUser.id).map((u)=>{
        const messages = c.filter((a)=>a.sender.id===u||a.recipient.id===u);
        const senderMessage = messages.filter((a)=>a.sender.id!==this.authUser.id)[0];
        const user = senderMessage?senderMessage.sender:messages.filter((a)=>a.recipient.id!==this.authUser.id)[0].recipient;

        return { user, messages};
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

  getUser = async (id) => {
    return await this.authService.getUser(id);
  }

  newMessage = async data => {
    const r = await this.messageApi.create(data);
    if(r.success){
      const {id, senderId, senderName, senderSurname, senderProfileUrl, recipientId, recipientName, recipientSurname, recipientProfileUrl, sentAt, hasRead, message} = r.message;
      data.updateFromServer({id, message, sentAt, hasRead, sender: new User(senderId, senderName, senderSurname, ``, ``, ``, senderProfileUrl), recipient: new User(recipientId, recipientName, recipientSurname, ``, ``, ``, recipientProfileUrl)});
      const c = this.conversations.find(i=>i.user.id===data.recipient.id);
      if(c){
        c.messages.push(data);
      } else {
        this.setConversations([...this.conversations, {user: data.recipient, messages: [ data ]}]);
      }
    }
    return r;
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

  createStudent = async (userObj) => {
    return await this.authService.createStudent(userObj);
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
