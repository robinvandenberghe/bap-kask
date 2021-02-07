import React, { useEffect, useState, useRef } from 'react';
import { useNode } from '@craftjs/core';
import { AudioSettings } from './AudioSettings';
import style from "../Selectors.module.css";

const defaultProps = {
  margin: [`0`, `0`, `0`, `0`],
  shadow: 0,
  color: { r: 81, g: 92, b: 192, a: 1 },
};

export const Audio = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const {
    margin,
    shadow,
    color,
    audioSrc
  } = props;
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  const audioRef = useRef();
  const [ duration, setDuration ] = useState({time: 0, string: `0:00`});
  const [ position, setPosition ] = useState({time: 0, string: `0:00`});

  useEffect(()=>{
    audioRef.current.addEventListener(`loadedmetadata`, ()=>{
      const dur = (audioRef.current.duration/60);
      setDuration({time: dur, string: Math.floor(dur)+ `:`+ (`0` + Math.round(60*(dur%1)).toString()).slice(-2)});
      const pos = (audioRef.current.currentTime/60);
      setPosition({time: pos, string: Math.floor(pos)+ `:`+ (`0` + Math.round(60*(pos%1)).toString()).slice(-2)});
      audioRef.current.addEventListener(`timeupdate`, ()=>{
        const pos = (audioRef.current.currentTime/60);
        setPosition({time: pos, string: Math.floor(pos)+ `:`+ (`0` + Math.round(60*(pos%1)).toString()).slice(-2)});
      });
    });
  });

  return (
    <div
      ref={connect}
      className={style.audioBlock}
      style={{
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        boxShadow:
          shadow === 0
            ? `none`
            : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        maxWidth: `100%`,
      }}
    >
      <div className={style.controlBox}>
        <img alt={`pause icon`} src={`/assets/img/icons/pause.svg`} className={style.controlIcon} onClick={()=>audioRef.current.pause()}/>
        <img alt={`play icon`} src={`/assets/img/icons/play.svg`} className={style.controlIcon} onClick={()=>audioRef.current.play()} />
        <span className={style.controlDuration}>{`${position.string} / ${duration.string}`}</span>
      </div>
      <div className={style.progressContainer} onClick={(e)=>{
        const w = e.currentTarget.offsetWidth, pos = e.nativeEvent.offsetX;
        const newTime = (pos/w)*duration.time;
        audioRef.current.currentTime = newTime*60;
        }}>
        <span style={{backgroundColor: `rgba(${Object.values(color)})`, width: duration.time&&position.time? `${(position.time/duration.time*100)}%`: 0}} className={style.progressBar} />
      </div>
      <audio ref={audioRef} src={process.env.NODE_ENV===`development`?`http://localhost:4000${audioSrc}`:audioSrc}  />
    </div>
  );
};

Audio.craft = {
  displayName: `Audio`,
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: AudioSettings,
  },
};
