import { makeAutoObservable, runInAction } from "mobx";
import Project from "../models/Project";
import Api from "../api";
class ProjectStore {
  projects = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`projects`);
    makeAutoObservable(this);
  }

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this._addProject));
  };

  addProject = data => {
    const newProject = new Project();
    newProject.updateFromServer(data);
    this.projects.push(newProject);
    this.api
      .create(newProject)
      .then(projectValues => newProject.updateFromServer(projectValues));
  };

  _addProject = values => {
    console.log(values);
    const project = new Project();
    project.updateFromServer(values);
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
