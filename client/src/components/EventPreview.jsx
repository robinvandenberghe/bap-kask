import React from "react";
import style from "./EventPreview.module.css";
import classNames from 'classnames';

const EventPreview = ({event, isActive, onClick}) => {
  const {topic, title, subline, startEndHour, startEndDate} = event;
  return (
    <div className={classNames(style.container, isActive? style.active :null)} onClick={()=>onClick(event)}>
      <div className={style.infoContainer}>
        <h4>{title}</h4>
        <div className={style.subInfo}>
          <div className={style.topicLabel} style={{backgroundColor: `#${topic.labelColor}`}}>
            <span className={style.bol}/>
            <span>{topic.title}</span>
          </div>
          <span>{subline}</span>
        </div>
      </div>
      <div className={style.dateContainer}>
        <span>{startEndDate}</span>
        <span>{startEndHour}</span>
      </div>
    </div>
  );
};

export default EventPreview;
