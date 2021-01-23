import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class User {
  constructor(name, surname, id = uuid.v4()) {
    this.id = id;
    this.name = name;
    this.surname = surname;
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

decorate(User, {
  id: observable,
  name: observable,
  surname: observable,
  setId: action,
  setName: action,
  setSurname: action,
});

export default User;
