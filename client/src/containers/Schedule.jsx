import React, { useState, useEffect } from "react";
import { useStores } from "../hooks/useStores";
import { observer } from 'mobx-react-lite';
import { observe } from 'mobx';
import { useHistory, useParams } from "react-router-dom";
import stylesLayout from "../styles/layout.module.css";
import style from "./Schedule.module.css";
import classNames from 'classnames';
import EventPreview from "../components/EventPreview";
import EventDetail from "./EventDetail";

const Schedule = () => {
  const { eventStore } = useStores();
  const { id } = useParams();
  const history = useHistory();
  const [ selectedEvent, setEvent] = useState(id?eventStore.events.find((item)=>item.id===id):undefined);
  const [ filterOpen, setFilterOpen] = useState(false);
  const [ split, setSplit ] = useState(true);
  const [ topicFilter, setFilter] = useState(getDistinctTopics(eventStore.events));
  observe(eventStore.events, arr => {
    if(id&&arr.object.find((item)=>item.id===id)){
      setEvent(arr.object.find((item)=>item.id===id));
    }
    setFilter(getDistinctTopics(arr.object))
  });
  
  useEffect(()=>{
    if(!id&&selectedEvent){
      setEvent();
    }
    check();
    window.addEventListener(`resize`, check);
  }, [id])

  const filterItemClicked = (item) => {
    const obj = [...topicFilter];
    const i = obj.find(a=>a===item);
    i.selected = !i.selected;
    setFilter(obj);
  }

  const filterEvents = (item) => {
    if (topicFilter.find((i)=>i.selected)){
      const top = topicFilter.find((i)=>i.id===item.topic.id);
      return (top && top.selected);
    }else{
      return true;
    }
  }

  const check = () => {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName(`body`)[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    setSplit(windowWidth > 1000);
    return windowWidth > 1000;
  }

  const handleClick = (event) => {
    setEvent(event);
    history.push(`/schedule/${event.id}`)
  }

  return (
    <section className={stylesLayout.gridLayout} >
      {!split&&id?
        <EventDetail event={selectedEvent} split={split} />
      :<>
        <div className={style.eventOverview}>
          <div className={style.filterWrapper}>
            <div className={style.filterButton} onClick={()=>setFilterOpen((previous)=>!previous)}>
              <img alt={`filter knop`} src={`/assets/img/icons/filter.svg`} className={style.filterIcon}/>
              <span>Filter</span>
            </div>
            <div className={classNames(style.filterList, filterOpen? style.active : null)}>
                <ul className={style.filterTopics}>
                  {topicFilter.map((item, index)=>{
                    return(
                      <li key={index} className={style.topicItem} onClick={()=>filterItemClicked(item)}>
                        <span className={style.filterLabel} style={{backgroundColor: `#${item.labelColor}`}}/>
                        <span>{item.title}</span>
                        {item.selected? <img alt={`Checkmark`} src={`/assets/img/icons/check.svg`} className={style.checkMark} /> :null}
                      </li>
                    );
                  })}
                </ul>
              </div>
          </div>
          <ul className={style.eventList}>
            {eventStore.events.filter(filterEvents).map((event, index)=><EventPreview event={event} key={index} isActive={event===selectedEvent} onClick={handleClick}/>)}
          </ul>
        </div>
        {split?
          <div className={style.eventDetail}>
            <EventDetail event={selectedEvent} split={split} />
          </div>
        :null}
      </>}

    </section>
  );
};

export default observer(Schedule);

const getDistinctTopics = (array) => {
  const result = [];
  const map = new Map();
  for (const item of array.map((i)=>{return {...i.topic, selected:false}})) {
      if(!map.has(item.id)){
        map.set(item.id, true);
        result.push(item);
      }
  }
  return result;
}