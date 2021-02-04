import { makeAutoObservable, action } from "mobx";
import Project from "../models/Project";
import User from "../models/User";
import Api from "../api";
class ProjectStore {
  projects = [];
  selections = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`projects`);
    this.getAll();
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(action(
      d => d.forEach(this._addProject)
    ));
  };


  addProject = data => {
    const { id, userId, userName, userSurname, studyId, studyTitle, userProfileUrl, subjectId, subjectTitle, title, coverUrl, slug, content } = data;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    const newProject = new Project();
    newProject.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, subject:{ id: subjectId, title: subjectTitle}, coverUrl, slug, content });
    this.api.create(newProject).then(projectValues => this._addProject(projectValues));
  };

  _addProject = values => {
    const { id, userId, userName, userSurname, studyId, studyTitle, userProfileUrl, subjectId, subjectTitle, title, coverUrl, slug, content } = values;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    const project = new Project();
    project.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, subject:{ id: subjectId, title: subjectTitle}, coverUrl, slug, content });
    this.projects.push(project);
  };

  updateProject = async (project) => {
    const values = await this.api.update(project);
    const { id, userId, userName, userSurname, studyId, studyTitle, userProfileUrl, subjectId, subjectTitle, title, coverUrl, slug, content } = values;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    project.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, subject:{ id: subjectId, title: subjectTitle}, coverUrl, slug, content });
  };

  deleteProject = Project => {
    this.projects.remove(Project);
    this.api.delete(Project);
  };
}

export default ProjectStore;
