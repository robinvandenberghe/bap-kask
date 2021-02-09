import { makeAutoObservable, action } from "mobx";
import Project from "../models/Project";
import User from "../models/User";
import Api from "../api";
class ProjectStore {

  constructor(rootStore) {
    this.projects = [];
    this.selections = [];
    this.subjects = [];
    this.studies = [];
    this.rootStore = rootStore;
    this.api = new Api(`projects`);
    this.subjectApi = new Api(`subjects`);
    this.studyApi = new Api(`studies`);
    this.getAll();
    this.getAllStudies();
    this.getAllSubjects();
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(action(
      d => d.forEach(this._addProject)
    ));
  };

  getAllStudies = () => {
    this.studyApi.getAll().then(action(
      d => d.forEach(item => {
        this.studies.push(item);
      })
    ));
  };

  getAllSubjects = () => {
    this.subjectApi.getAll().then(action(
      d => d.forEach(item => {
        this.subjects.push(item);
      })
    ));
  };

  addProject = async data => {
    const {userObj, studyId, subjectId, title, cover, slug} = data;
    const newProject = new Project();
    const c = await this.uploadFile({data: {id: newProject.id, previous: undefined, type: `project`} , file: cover});
    newProject.updateFromServer({id: newProject.id, user: userObj, title, study: { id: studyId }, subject:{ id: subjectId }, coverUrl: c.fileUrl, slug });
    console.log(newProject);
    const r = await this.api.create(newProject);
    this._addProject(r);
    return r;
  };

  _addProject = values => {
    const { id, userId, userName, userSurname, userEmail, studyId, studyTitle, userProfileUrl, subjectId, subjectTitle, labelColor, textColor, title, coverUrl, slug, content } = values;
    const user = new User();
    user.updateFromServer({id: userId, name: userName, surname: userSurname, email: userEmail, profileUrl: userProfileUrl});
    const project = new Project();
    project.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, subject:{ id: subjectId, title: subjectTitle, labelColor, textColor}, coverUrl, slug, content });
    this.projects.push(project);
  };

  updateProject = async (project) => {
    const values = await this.api.update(project);
    const { id, userId, userName, userSurname, userEmail, studyId, studyTitle, userProfileUrl, subjectId, subjectTitle, labelColor, textColor, title, coverUrl, slug, content } = values;
    const user = new User();
    user.updateFromServer({id: userId, email: userEmail, name: userName, surname: userSurname, profileUrl: userProfileUrl});
    project.updateFromServer({id, user, title, study: { id: studyId, title: studyTitle}, subject:{ id: subjectId, title: subjectTitle, labelColor, textColor}, coverUrl, slug, content });
  };

  uploadFile = async (data) => {
    return await this.api.uploadFile(data);
  }

  deleteProject = project => {
    this.projects.splice(this.projects.indexOf(project), 1);
    this.api.delete(project);
  };
}

export default ProjectStore;
