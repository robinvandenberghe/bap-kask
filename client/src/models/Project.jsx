import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx";

class Project {
  constructor(user, study, title, content = [], id = uuidv4()) {
    this.id = id;
    this.user = user;
    this.study = study;
    this.title = title;
    this.content = content;
    makeAutoObservable(this);
  }

  setId = value => (this.id = value);
  setTitle = value => (this.title = value);
  setContent = value => (this.content = value);
  setUser = value => (this.user = value);
  setStudy = value => (this.study = value);


  updateFromServer = values => {
    this.setId(values.id);
    this.setTitle(values.title);
    this.setContent(values.content);
    this.setStudy(values.study);
    this.setUser(values.user);
  };

}

export default Project;
