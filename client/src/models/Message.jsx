import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx"

class Message {
  constructor(sender, recipient, message, id = uuidv4(), sentAt = new Date(), hasRead = false) {
    this.id = id;
    this.sender = sender;
    this.recipient = recipient;
    this.sentAt = sentAt;
    this.message = message;
    this.hasRead = hasRead;
    makeAutoObservable(this);

  }

  setId = value => (this.id = value);
  setSender = value => (this.sender = value);
  setRecipient = value => (this.recipient = value);
  setMessage = value => (this.message = value);
  setHasRead = value => (this.hasRead = value);
  setSentAt = value => (this.sentAt = value);


  updateFromServer = values => {
    this.setId(values.id);
    this.setSender(values.sender);
    this.setRecipient(values.recipient);
    this.setMessage(values.message);
    this.setHasRead(values.hasRead);
    this.setSentAt(values.sentAt);
  };
}

export default Message;
