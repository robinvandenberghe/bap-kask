import { makeAutoObservable, runInAction } from "mobx";
import Project from "../models/Project";
import User from "../models/User";
import Api from "../api";
class ProjectStore {
  projects = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`projects`);
    this.getAll();
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this._addProject));
  };

  addProject = data => {
    const { id, userId, userName, userSurname, studyId, studyTitle, userProfileUrl, subjectId, title, coverUrl } = data;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    const newProject = new Project();
    newProject.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, coverUrl });
    this.projects.push(newProject);
    this.api
      .create(newProject)
      .then(projectValues => newProject.updateFromServer(projectValues));
  };

  _addProject = values => {
    const { id, userId, userName, userSurname, studyId, studyTitle, userProfileUrl, subjectId, title, coverUrl} = values;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    const project = new Project();
    project.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, coverUrl});
    runInAction(() => this.projects.push(project));
  };

  updateProject = project => {
    this.api
      .update(project)
      .then(projectValues => project.updateFromServer(projectValues));
  };

  deleteProject = Project => {
    this.projects.remove(Project);
    this.api.delete(Project);
  };
}

export default ProjectStore;
