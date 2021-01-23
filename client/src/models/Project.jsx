import uuid from "uuid";
import { decorate, observable, action } from "mobx";

class Project {
  constructor(user, study, title, content = [], id = uuid.v4()) {
    this.id = id;
    this.user = user;
    this.study = study;
    this.title = title;
    this.content = content;
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

decorate(Project, {
  user: observable,
  study: observable,
  title: obeservable,
  content: observable,
  setUser: action,
  setStudy: action,
  setTitle: action,
  setContent: action
});

export default Project;
