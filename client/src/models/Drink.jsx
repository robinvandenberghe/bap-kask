import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class Drink {
  constructor(name, price, id = uuid.v4()) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  setId = value => (this.id = value);
  setName = value => (this.name = value);
  setPrice = value => (this.price = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setName(values.name);
    this.setPrice(values.price);
  };

  get values() {
    return { name: this.name, price: this.price };
  }
}

decorate(Drink, {
  id: observable,
  name: observable,
  price: observable,
  setId: action,
  setName: action,
  setPrice: action,
  values: computed
});

export default Drink;
