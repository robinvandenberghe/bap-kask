import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from "mobx"

class User {
  constructor(name, surname, id = uuidv4()) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    makeAutoObservable(this);

  }

  setId = value => (this.id = value);
  setName = value => (this.name = value);
  setSurname = value => (this.surname = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setName(values.name);
    this.setSurname(values.surname);
  };
}

export default User;
