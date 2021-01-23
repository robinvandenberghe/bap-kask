import { decorate, observable, configure, action, runInAction } from "mobx";
import Project from "../models/Project";
import Api from "../api";

configure({ enforceActions: `observed` });
class ProjectStore {
  projects = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`projects`);
    this.getAll();
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

decorate(ProjectStore, {
  projects: observable,
  addProject: action,
  deleteProject: action,
  updateProject: action
});

export default ProjectStore;
