import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx";

class Event {
  constructor(id = uuidv4(), topic, startDate = undefined, endDate = undefined, title = undefined, content = undefined, ticketInfo = undefined, address = undefined, subline = undefined) {
    this.id = id;
    this.topic = topic;
    this.startDate = startDate;
    this.endDate = endDate;
    this.title = title;
    this.content = content;
    this.ticketInfo = ticketInfo;
    this.address = address;
    this.subline = subline;
    makeAutoObservable(this);
  }

  setId = value => (this.id = value);
  setTitle = value => (this.title = value);
  setContent = value => (this.content = value);
  setTopic = value => (this.topic = value);
  setStartDate = value => (this.startDate = new Date(value));
  setEndDate = value => (this.endDate = new Date(value));
  setTicketInfo = value => (this.ticketInfo = value);
  setAddress = value => (this.address = value);
  setSubline = value => (this.subline = value);

  updateFromServer = values => {
    this.setId(values.id);
    this.setTitle(values.title);
    this.setContent(values.content);
    this.setTopic(values.topic);
    this.setStartDate(values.startDate);
    this.setEndDate(values.endDate);
    this.setTicketInfo(values.ticketInfo);
    this.setAddress(values.address);
    this.setSubline(values.subline);
  };

  get startEndHour() {
    return `${this.startDate.getHours()}:${(`0`+this.startDate.getMinutes()).slice(-2)} - ${this.endDate.getHours()}:${(`0`+this.endDate.getMinutes()).slice(-2)}`;
  }

  get startEndDate() {
    if(this.startDate.toDateString()===this.endDate.toDateString()){
      return `${this.startDate.toLocaleDateString(`en-GB`, { weekday: `short`})} ${(`0`+this.startDate.getDate()).slice(-2)}.${(`0`+(this.startDate.getMonth()+1)).slice(-2)}`;
    }
    return `${this.startDate.toLocaleDateString(`en-GB`, { weekday: `short`})} ${(`0`+this.startDate.getDate()).slice(-2)}.${(`0`+(this.startDate.getMonth()+1)).slice(-2)} - ${this.endDate.toLocaleDateString(`en-GB`, { weekday: `short`})} ${(`0`+this.endDate.getDate()).slice(-2)}.${(`0`+(this.endDate.getMonth()+1)).slice(-2)}`;
  }


}

export default Event;
