import React, { useState } from "react";
import { useStores } from "../hooks/useStores";
import style from "./NewEvent.module.css";
import TextInputField from './TextInputField';
import { observer } from "mobx-react";
import ROUTES from "../constants";
import { useHistory } from "react-router-dom";
import Event from '../models/Event';

const NewEvent = () => {
  const {eventStore, uiStore} = useStores();
  const history = useHistory();
  const [ error, setError ] = useState();
  const [ title, setTitle ] = useState(``);
  const [ address, setAddress ] = useState(``);
  const [ ticketInfo, setTicket ] = useState(``);
  const [ startDate, setStartDate ] = useState({date: undefined, time:undefined});
  const [ endDate, setEndDate ] = useState({date: undefined, time:undefined});
  const [ subline, setSubline ] = useState(``);
  const [ topicId, setTopic ] = useState(``);


  const handleSubmit = async () => {
    if(!title){
      return setError({
        name: `title`,
        id: `EMPTY`,
        message: `Please enter the event title`
      });
    }
    if(!topicId){
      return setError({
        name: `topicId`,
        id: `EMPTY`,
        message: `Please select a topic.`
      });
    }
    if(!subline){
      return setError({
        name: `subline`,
        id: `EMPTY`,
        message: `Please enter a subtitle.`
      });
    }
    if(!ticketInfo){
      return setError({
        name: `ticketInfo`,
        id: `EMPTY`,
        message: `Please enter the ticket info. If there is none, fill in 'Free entrance'.`
      });
    }
    if(!address){
      return setError({
        name: `address`,
        id: `EMPTY`,
        message: `Please enter the address.`
      });
    }
    if(!startDate.date || !startDate.time){
      return setError({
        name: `startDate`,
        id: `EMPTY`,
        message: `Please select a start date for the event.`
      });
    }
    if(!endDate.date || !endDate.time){
      return setError({
        name: `endDate`,
        id: `EMPTY`,
        message: `Please select an end date for the event.`
      });
    }
    if(new Date(`${endDate.date} ${endDate.time}`)<=new Date(`${startDate.date} ${startDate.time}`)){
      return setError({
        name: `endDate`,
        id: `EMPTY`,
        message: `The end date needs to be greater than the start date.`
      });
    }
    const e = new Event();
    e.updateFromServer({id: e.id, title, topic: { id: topicId}, address, ticketInfo, startDate: new Date(`${startDate.date} ${startDate.time}`), endDate: new Date(`${endDate.date} ${endDate.time}`), subline});
    const r = await eventStore.addEvent(e);
    if(!r.success){
      return setError(r.error);
    }
    if(r.event.title===title){
      setError();
      setTitle();
      setAddress();
      setTicket();
      setStartDate({date: undefined, time:undefined});
      setEndDate({date: undefined, time:undefined});
      setSubline();
      setTopic();
      history.push(ROUTES.scheduleDetail.to + r.event.id);
    }else{
      return setError({
        name: `email`,
        id: `SOMETHING_WRONG`,
        message: `Something went wrong in the process.`
      });
    }
  }

  return (
    <section className={style.container}>
      <div className={style.sideContainer}>
        <TextInputField type={`text`} value={title} setValue={setTitle} name={`title`} label={`Event title`} error={error} placeholder={`Enter the event title.`} setError={setError} />
        <label htmlFor="topic" className={style.selectWrapper}>
          <span>Topic</span>
          <select id="topic" onChange={(e)=>setTopic(e.target.value)} value={topicId} className={style.selectInput}>
            <option value={``} disabled>Select the event topic.</option>
            {eventStore.topics.map((i, index)=><option key={index} value={i.id}>{i.title}</option>)}
          </select>
          {error&&error.name===`study`?<span className={style.selectError}>{error.message}</span>:null}
        </label>
        <TextInputField type={`text`} value={subline} setValue={setSubline} name={`subline`} label={`Subtitle`} error={error} placeholder={`Enter a subtitle for the event.`} setError={setError} />
        <TextInputField type={`text`} value={ticketInfo} setValue={setTicket} name={`ticketInfo`} label={`Ticket information`} error={error} placeholder={`Enter the ticket information`} setError={setError} />
      </div>
      <div className={style.sideContainer}>
        <TextInputField type={`text`} value={address} setValue={setAddress} name={`address`} label={`Address`} error={error} placeholder={`Enter the event address`} setError={setError} />
        <label htmlFor="startDate" className={style.selectWrapper}>
          <span>Start date</span>
          <div className={style.dateTimeContainer}>
            <input id="startDate" type={`date`} onChange={(e)=>setStartDate({date: e.target.value, time: startDate.time})} value={startDate.date} className={style.selectInput} />
            <input id="startDate" type={`time`} onChange={(e)=>setStartDate({date: startDate.date, time: e.target.value})} value={startDate.time} className={style.selectInput} />
          </div>
          {error&&error.name===`startDate`?<span className={style.selectError}>{error.message}</span>:null}
        </label>
        <label htmlFor="endDate" className={style.selectWrapper}>
          <span>Start date</span>
          <div className={style.dateTimeContainer}>
            <input id="endDate" type={`date`} onChange={(e)=>setEndDate({date: e.target.value, time: endDate.time})} value={endDate.date} className={style.selectInput} />
            <input id="endDate" type={`time`} onChange={(e)=>setEndDate({date: endDate.date, time: e.target.value})} value={endDate.time} className={style.selectInput} />
          </div>
          {error&&error.name===`endDate`?<span className={style.selectError}>{error.message}</span>:null}
        </label>
        <div className={style.submitButton} onClick={handleSubmit}>Create event</div>
      </div>
    </section>
  );
};

export default observer(NewEvent);