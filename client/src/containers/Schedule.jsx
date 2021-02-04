import React, { useState, useEffect } from "react";
import { useStores } from "../hooks/useStores";
import { observer } from 'mobx-react-lite';
import { observe, set } from 'mobx';
import { Route, useHistory, Switch } from "react-router-dom";
import stylesLayout from "../styles/layout.module.css";
import style from "./Schedule.module.css";
import classNames from 'classnames';
import EventPreview from "../components/EventPreview";
import EventDetail from "./EventDetail";
import ROUTES from "../constants";

const Schedule = () => {
  const { eventStore } = useStores();
  const history = useHistory();
  const result = [];
  const map = new Map();
  for (const item of eventStore.events.map((i)=>{return {...i.topic, selected:false}})) {
      if(!map.has(item.id)){
        map.set(item.id, true);
        result.push(item);
      }
  }
  const [ selectedEvent, setEvent] = useState();
  const [ filterOpen, setFilterOpen] = useState(false);
  const [ split, setSplit ] = useState(true);
  const [ topicFilter, setFilter] = useState(result);

  observe(eventStore.events, arr => {
    const map = new Map();
    const res = [];
    for (const item of arr.object.map((i)=>{return {...i.topic, selected:false}})) {
        if(!map.has(item.id)){
          map.set(item.id, true);
          res.push(item);
        }
    }
    setFilter(res);
  });

  useEffect(()=>{
    check();
    window.addEventListener(`resize`, check);
  })

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
      <Switch> 
        {!split?
          <Route path={ROUTES.scheduleDetail.path}>
            <EventDetail inputEvent={selectedEvent} />
          </Route>
        :null}
        <Route path={`/`}>
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
              <EventDetail inputEvent={selectedEvent} />
            </div>
          :null}
        </Route>
      </Switch>
    </section>

  );
};

export default observer(Schedule);
