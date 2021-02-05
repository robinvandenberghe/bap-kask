import React, { useState } from "react";
import { observer } from "mobx-react-lite"
// import cx from 'classnames';
import lz from 'lzutf8';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Container, Text } from '../components/selectors';
import { RenderNode, Viewport } from '../components/editor';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Button } from '../components/selectors/Button';
import { Video } from '../components/selectors/Video';
import { Image } from '../components/selectors/Image';
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
          <Editor
            resolver={{
              Container,
              Text,
              Custom1,
              Custom2,
              Custom2VideoDrop,
              Custom3,
              Custom3BtnDrop,
              OnlyButtons,
              Button,
              Video,
              Image,
            }}
            enabled={enabled}
            onRender={RenderNode}
          >
            <Viewport object={{item: event, type: `event`, split, json}}>
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
