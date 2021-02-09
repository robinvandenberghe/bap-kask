import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import cx from 'classnames';
import { useStores } from "../hooks/useStores";
import style from "./Chat.module.css";
import stylesLayout from '../styles/layout.module.css';
import withAuthentication from "../components/auth/WithAuthentication";
import ROUTES from "../constants";
import { autorun } from "mobx";


const Chat = () => {
  const { uiStore, projectStore } = useStores();
  const { userId } = useParams();
  const [ selected, setSelected ] = useState();
  const [ query, setQuery ] = useState(``);
  const [ filterVal, setFilter ] = useState(``);
  const [ newMessage, setMessage ] = useState(``);
  const [ split, setSplit ] = useState(true);
  const history = useHistory();

  autorun(()=>{
    if(userId&&!selected)setSelected({...uiStore.conversations.find((u)=>u.user.id===userId), work: projectStore.projects.find((u)=>u.user.id===userId)});
  })

  const ChatPreview = ({conversation}) => {
    const {user:{name, surname, profileUrl}, messages} = conversation;
    return (
      <li className={cx(style.chatPreview, selected?style.selected:null)} onClick={()=>handleClick(conversation)}>
        <img alt={`${name} ${surname}`} src={profileUrl?`/assets/img/users/${profileUrl}`:`/assets/img/users/default.jpg`} className={style.profileImg} />
        <div className={style.previewBox}>
          <span className={style.userName}>{name + ` ` + surname}</span>
          <span className={style.firstLine}>{messages[messages.length-1].message}</span>
        </div>
        <span>{new Date(messages[messages.length-1].sentAt).toLocaleDateString(`nl-BE`, {day: `numeric`, month: `short`})}</span>
      </li>
    );
  }

  const Message = ({data}) => {
    const {sender: {id, name, surname, profileUrl}, message, hasRead, sentAt} = data;
    return (
      <li className={cx(style.messageContainer, id!==uiStore.authUser.id?style.sender:null)}>
        {id!==uiStore.authUser.id?<img alt={`${name} ${surname}`} src={profileUrl?`/assets/img/users/${profileUrl}`:`/assets/img/users/default.jpg`} className={style.profileImg} />:null}
        <div className={style.messageBox}>
          <p>{message}</p>
          <span className={style.timeStamp}>{new Date(sentAt).toLocaleDateString(`nl-BE`, {day: `numeric`, month: `short`}) + ` ` + new Date(sentAt).toLocaleTimeString(`nl-BE`, {hour: `numeric`, minute: `numeric`})}</span>
        </div>
      </li>
    );
  }

  const check = () => {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName(`body`)[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    setSplit(windowWidth > 800);
    return windowWidth > 800;
  }

  const handleClick = (c) => {
    setSelected({...c, work: projectStore.projects.find(item=>item.user.id===c.user.id)});
    history.push(`${ROUTES.chatDetail.to}${c.user.id}`);
  }

  const handleSearch = e => {
    if(e)e.preventDefault();
    setFilter(query.toLowerCase());
  }

  useEffect(()=>{
    if(!userId&&selected){
      setSelected();
    }
    check();
    window.addEventListener(`resize`, check);
    return () => {
      window.removeEventListener(`resize`, check);
    }
  }, [userId]);
 

  return (
    <section className={stylesLayout.layout}>
      {!split&&userId?
      <section className={style.conversation}>
        <div className={style.chatHeader}>
          {selected && selected.user?
          <>
            {selected.work?
            <span className={style.strong}>{selected.work.title}</span>
            :null}
            <span>{`${selected.user.name} ${selected.user.surname}`}</span>
          </>
          :null}
        </div>
        <ul className={style.messages}>
          {selected && selected.messages? selected.messages.map((item, index) => <Message data={item} key={index} />):null}
        </ul>
        <div className={style.sendBar}>
          <input className={style.sendInput} type={`text`} name={`searchQuery`} placeholder={`Type a message...`} value={newMessage} onChange={(e)=>setMessage(e.target.value)} />
            <span className={style.sendButton}>Send</span>
        </div>
      </section>
      :<div className={cx(style.chatContainer, stylesLayout.layout)} >
          <section className={style.summaryColumn}>
            <h3>Search</h3>
            <form className={style.searchContainer} onSubmit={handleSearch}>
              <input className={style.searchInput} type={`text`} name={`searchQuery`} placeholder={`Search a conversation...`} value={query} onChange={(e)=>setQuery(e.target.value)} />
              <span onClick={handleSearch} className={style.submitButton}>
                <img alt={`Search icon`} src={ `/assets/img/icons/search.svg`} />
              </span>
            </form>
            <h3>Chats</h3>
            <ul>
              {uiStore.conversations.filter((p)=>p.user.name.toLowerCase().indexOf(filterVal)!==-1||p.user.surname.toLowerCase().indexOf(filterVal)!==-1 || !filterVal).map((item, index)=><ChatPreview conversation={item} key={index} />)}
            </ul>
          </section>
          {split?
            !userId||!selected?
              <section className={style.selectChat}>
                <p>Select a conversation.</p>
              </section>
            :
            <section className={style.conversation}>
              <div className={style.chatHeader}>
                {selected && selected.user?
                <>
                  {selected.work?
                  <NavLink to={ROUTES.projectDetail.to+selected.work.slug} className={style.strong}>{selected.work.title}</NavLink>
                  :null}
                  <NavLink to={ROUTES.profileDetail.to+selected.user.id}>{` - ${selected.user.name} ${selected.user.surname}`}</NavLink>
                </>
                :null}
              </div>
              <ul className={style.messages}>
                {selected && selected.messages? selected.messages.map((item, index) => <Message data={item} key={index} />):null}
              </ul>
              <div className={style.sendBar}>
                <input className={style.sendInput} type={`text`} name={`searchQuery`} placeholder={`Type a message...`} value={newMessage} onChange={(e)=>setMessage(e.target.value)} />
                  <span className={style.sendButton}>Send</span>
              </div>
            </section>
          :null}
        </div>}
    </section>
  );
};

export default withAuthentication(observer(Chat));
