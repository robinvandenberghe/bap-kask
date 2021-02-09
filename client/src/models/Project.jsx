import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx";

class Project {
  constructor( id = uuidv4(), user = undefined, study = undefined, title = undefined, content = ``, coverUrl = undefined, slug = ``, subject = undefined) {
    this.id = id;
    this.user = user;
    this.study = study;
    this.title = title;
    this.content = content;
    this.coverUrl = coverUrl;
    this.slug = slug;
    this.subject = subject;
    makeAutoObservable(this);
  }

  setId = value => (this.id = value);
  setTitle = value => (this.title = value);
  setContent = value => (this.content = value);
  setUser = value => (this.user = value);
  setStudy = value => (this.study = value);
  setCover = value => (this.coverUrl = value);
  setSlug = value => (this.slug = value);
  setSubject = value => (this.subject = value);

  updateFromServer = values => {
    this.setId(values.id);
    this.setTitle(values.title);
    this.setContent(values.content);
    this.setStudy(values.study);
    this.setUser(values.user);
    this.setCover(values.coverUrl);
    this.setSlug(values.slug);
    this.setSubject(values.subject);
  };
}

export default Project;
