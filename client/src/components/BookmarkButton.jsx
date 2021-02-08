import React, { useState } from "react";
import { observer } from "mobx-react";
import cx from 'classnames';
import style from "./BookmarkButton.module.css";
import { useStores } from "../hooks/useStores";

const BookmarkButton = ({id, className, ...props}) => {
  const { uiStore } = useStores();
  const [ saved, setSaved ] = useState(uiStore.savedWorks.find(i=>i===id)?true:false);

  const handleBookmark = async () => {
    const r = await uiStore.saveWork(id);
    if(r.success){
      setSaved(r.saved);
    }
  }
  if(uiStore.authUser){
    return (
      <div className={cx(style.bookmarkButton, className)} onClick={handleBookmark} {...props}>
        {saved?<img alt={`Bookmarked icon`} src={`/assets/img/icons/bookmarkFill.svg`} className={style.headerIcon}/>:<img  alt={`Bookmark icon`} src={`/assets/img/icons/bookmark.svg`}  className={style.headerIcon}/>}
      </div>
    );
  }
  return null;

};

export default observer(BookmarkButton);