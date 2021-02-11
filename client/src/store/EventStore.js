import { makeAutoObservable, action } from "mobx";
import Event from "../models/Event";
import Api from "../api";
class EventStore {
  constructor(rootStore) {
    this.events = [];
    this.topics = [];
    this.rootStore = rootStore;
    this.api = new Api(`events`);
    this.topicApi = new Api(`topics`);
    this.getAll();
    this.getAllTopics();
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(action(
      d => d.forEach(this._addEvent)
    ));
  };

  getAllTopics = () => {
    this.topicApi.getAll().then(action(
      d => d.forEach((item)=>{
        this.topics.push(item)
      })
    ));
  };

  addEvent = async data => {
    const { id, topic, startDate, endDate, title, ticketInfo, address, subline} = data;
    const r = await this.api.create({id, title, topic, startDate, endDate, ticketInfo, address, subline });
    if(r)this._addEvent(r.event);
    return r;
  };

  _addEvent = values => {
    const { id, topicId, topicTitle, labelColor, startDate, endDate, title, content, ticketInfo, address, subline} = values;
    const event = new Event();
    event.updateFromServer({id, title, content, topic: { id: topicId, title: topicTitle, labelColor}, startDate, endDate, ticketInfo, address, subline });
    this.events.push(event);
  };

  updateEvent = async (event) => {
    const {success, event: values} = await this.api.update(event);
    if(success){
      const { id, topicId, topicTitle, labelColor, startDate, endDate, title, content, ticketInfo, address, subline} = values;
      event.updateFromServer({id, title, content, topic: { id: topicId, title: topicTitle, labelColor}, startDate, endDate, ticketInfo, address, subline });
    }
  };

  deleteEvent = event => {
    this.events.splice(this.events.indexOf(event), 1);
    this.api.delete(event);
  };
}

export default EventStore;
