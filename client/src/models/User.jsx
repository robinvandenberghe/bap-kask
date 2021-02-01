import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx"

class User {  
  constructor(id = uuidv4(), name = undefined, surname = undefined, email = undefined, password = undefined, role = `user`) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
    makeAutoObservable(this);
  }
  setId = value => (this.id = value);
  setName = value => (this.name = value);
  setSurname = value => (this.surname = value);
  setRole = value => (this.role = value);

  updateFromServer = values => {
    this.setId(values.id);
    this.setName(values.name);
    this.setSurname(values.surname);
    this.setRole(values.role);
  };
}

export default User;
