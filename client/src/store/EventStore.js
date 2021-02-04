import { makeAutoObservable, action } from "mobx";
import Event from "../models/Event";
import Api from "../api";
class EventStore {
  events = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`events`);
    this.getAll();
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(action(
      d => d.forEach(this._addEvent)
    ));
  };


  addEvent = data => {
    const { id, topicId, topicTitle, labelColor, startDate, endDate, title, content, ticketInfo, address, subline} = data;
    const newEvent = new Event();
    newEvent.updateFromServer({id, title, content, topic: { id: topicId, title: topicTitle, labelColor}, startDate, endDate, ticketInfo, address, subline });
    this.api.create(newEvent).then(values => this._addEvent(values));
  };

  _addEvent = values => {
    const { id, topicId, topicTitle, labelColor, startDate, endDate, title, content, ticketInfo, address, subline} = values;
    const event = new Event();
    event.updateFromServer({id, title, content, topic: { id: topicId, title: topicTitle, labelColor}, startDate, endDate, ticketInfo, address, subline });
    this.events.push(event);
  };

  updateEvent = async (event) => {
    const values = await this.api.update(event);
    const { id, topicId, topicTitle, labelColor, startDate, endDate, title, content, ticketInfo, address, subline} = values;
    event.updateFromServer({id, title, content, topic: { id: topicId, title: topicTitle, labelColor}, startDate, endDate, ticketInfo, address, subline });
  };

  deleteProject = event => {
    this.events.remove(event);
    this.api.delete(event);
  };
}

export default EventStore;
