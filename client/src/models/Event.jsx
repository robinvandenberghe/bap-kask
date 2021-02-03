import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx";

class Event {
  constructor(id = uuidv4(), topic, startDate = undefined, endDate = undefined, title = undefined, content = undefined, ticketInfo = undefined, address = undefined) {
    this.id = id;
    this.topic = topic;
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title;
    this.content = content;
    this.ticketInfo = ticketInfo;
    this.address = address;
    makeAutoObservable(this);
  }

  setId = value => (this.id = value);
  setTitle = value => (this.title = value);
  setContent = value => (this.content = value);
  setTopic = value => (this.topic = value);
  setStartDate = value => (this.startDate = value);
  setEndDate = value => (this.endDate = value);
  setTicketInfo = value => (this.ticketInfo = value);
  setAddress = value => (this.address = value);


  updateFromServer = values => {
    this.setId(values.id);
    this.setTitle(values.title);
    this.setContent(values.content);
    this.setTopic(values.topic);
    this.setStartDate(values.startDate);
    this.setEndDate(values.endDate);
    this.setTicketInfo(values.ticketInfo);
    this.setAddress(values.address);
  };
}

export default Event;
