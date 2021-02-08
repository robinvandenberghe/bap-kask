import React, { useEffect, useState } from "react";
import { useStores } from "../hooks/useStores";
import stylesLayout from "../styles/layout.module.css";
import style from "./Chat.module.css";
import cx from 'classnames';
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";

const Chat = () => {
  const { uiStore, projectStore } = useStores();
  const conversations = uiStore.conversations;
  const [ selected, setSelected ] = useState(conversations[0]);
  const [ query, setQuery ] = useState(``);
  const [ newMessage, setMessage ] = useState(``);

  const handleSearch = (e) => {
    e.preventDefault();
  }

  const ChatPreview = ({conversation}) => {
    const {user:{id, name, surname, profileUrl}, messages} = conversation;
    return (
      <li className={cx(style.chatPreview, selected?style.selected:null)} onClick={()=>setSelected({...conversation, work: projectStore.projects.find(item=>item.user.id===id)})}>
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

  useEffect(()=>{
    const init = () => {
      setSelected({...conversations[0], work: projectStore.projects.find(item=>item.user.id===conversations[0].user.id)}); 
    }
    init();
  }, [conversations])

  return (
    <div className={style.chatContainer} >
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
          {conversations.map((item, index)=><ChatPreview conversation={item} key={index} />)}
        </ul>
      </section>
      <section className={style.conversation}>
        <div className={style.chatHeader}>
          {selected && selected.user?
          <>
            {selected.work?
            <span className={style.strong}>{selected.work.title}</span>
            :null}
            <span>{`- ${selected.user.name} ${selected.user.surname}`}</span>
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
    </div>
  );
};

export default withAuthentication(observer(Chat));
