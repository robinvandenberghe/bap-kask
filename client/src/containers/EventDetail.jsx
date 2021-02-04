import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import classNames from 'classnames';
import lz from 'lzutf8';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text } from '../components/selectors';
import { RenderNode, Viewport } from '../components/editor';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Button } from '../components/selectors/Button';
import { Video } from '../components/selectors/Video';
import { Image } from '../components/selectors/Image';
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from './EventDetail.module.css';

const EventDetail = ({inputEvent}) => {
  const { id } = useParams();
  const { eventStore } = useStores();
  const event = inputEvent?inputEvent:eventStore.events.find((item)=>item.id===id);
  const [enabled] = useState(false);

  if(event){
    const {topic, title, subline, content, startEndHour, address, ticketInfo} = event;
    const uint8array = lz.decodeBase64(content);
    const json = lz.decompress(uint8array);
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
            enabled={enabled.toString()}
            onRender={RenderNode}
          >
            <Viewport object={{item: event, type: `event`}}>
              <div className={style.infoContainer}>
                <h2>{title}</h2>
                <div className={style.topicLabel} style={{backgroundColor: `#${topic.labelColor}`}}>
                  <span className={style.bol}/>
                  <span>{topic.title}</span>
                </div>
                <div>
                  <img alt={`Clock icon`} src={`/assets/img/icons/clock.svg`}/>
                  <span>{startEndHour}</span>
                </div>
                <div>
                  <img alt={`Pin icon`} src={`/assets/img/icons/pin.svg`}/>
                  <span>{address}</span>
                </div>
                <div>
                  <img alt={`Ticket icon`} src={`/assets/img/icons/ticket.svg`}/>
                  <span>{ticketInfo}</span>
                </div>
              </div>
              <Frame data={json} />
            </Viewport>
          </Editor>
      </section>
    );
  }else{
    if(id || inputEvent){
      return(
        <section className={stylesLayout.layout}>
          <div className={style.loadingContainer}>
            <h3>Event laden...</h3>
            <img alt={`Laadanimatie`} src={`/assets/img/loading.svg`} />
          </div>
        </section>
      )
    }
    return(
      <section className={stylesLayout.layout}>
        <div className={style.loadingContainer}>
          <h3>Selecteer een evenement...</h3>
        </div>
      </section>
    )
  }

};

const slugify = (string)  => {
  return string
      .normalize(`NFD`) // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, ``) // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, ``) // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, `-`) // separator
}

export default observer(EventDetail);
