import React, { useState } from "react";
import cx from 'classnames';
import lz from 'lzutf8';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { AppContainer, Container, Text, Button, Video, Image  } from '../components/selectors';
import { RenderNode, Viewport } from '../components/editor';
import stylesLayout from "../styles/layout.module.css";
import style from './EventDetail.module.css';

const EventDetail = ({event, split}) => {
  const [ enabled ] = useState(false);

  if(event){
    const {topic, title, content, startEndHour, address, ticketInfo} = event;
    const base64 = lz.decodeBase64(content);
    const json = lz.decompress(base64);
    return (
      <section className={stylesLayout.layout}>
        <div className={style.scroll}>
          <Editor
            resolver={{
              AppContainer,
              Container,
              Text,
              Button,
              Video,
              Image,
            }}
            enabled={enabled}
            onRender={RenderNode}
          >
            <Viewport object={{item: event, type: `event`, split, json,  template: <Element
              id={`appContainer`}
              canvas
              is={AppContainer}
              width="100%"
              height="auto"
              background={{ r: 255, g: 255, b: 255, a: 0 }}
              padding={[`10`, `10`, `10`, `10`]}
              flexDirection={`row`}
            ></Element> }} >
              <div className={style.infoContainer}>
                <h2>{title}</h2>
                <div className={style.topicLabel} style={{backgroundColor: `#${topic.labelColor}`}}>
                  <span className={style.bol}/>
                  <span>{topic.title}</span>
                </div>
                <div className={style.infoLine}>
                  <img alt={`Clock icon`} src={`/assets/img/icons/clock.svg`}/>
                  <span>{startEndHour}</span>
                </div>
                <div className={style.infoLine}>
                  <img alt={`Pin icon`} src={`/assets/img/icons/pin.svg`}/>
                  <span>{address}</span>
                </div>
                <div className={style.infoLine}>
                  <img alt={`Ticket icon`} src={`/assets/img/icons/ticket.svg`}/>
                  <span>{ticketInfo}</span>
                </div>
              </div>
            </Viewport>
          </Editor>
        </div>
      </section>
    );
  }else{
    return(
      <div className={style.loadingContainer}>
        <h3>Selecteer een evenement.</h3>
      </div>
    )
  }

};

export default (EventDetail);
