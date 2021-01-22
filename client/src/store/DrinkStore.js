import { decorate, observable, configure, action, runInAction } from "mobx";
import Drink from "../models/Drink";
import Api from "../api";

configure({ enforceActions: `observed` });
class DrinkStore {
  drinks = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`drinks`);
    this.getAll();
  }

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this._addDrink));
  };

  addDrink = data => {
    const newDrink = new Drink();
    newDrink.updateFromServer(data);
    this.drinks.push(newDrink);
    this.api
      .create(newDrink)
      .then(drinkValues => newDrink.updateFromServer(drinkValues));
  };

  _addDrink = values => {
    console.log(values);
    const drink = new Drink();
    drink.updateFromServer(values);
    runInAction(() => this.drinks.push(drink));
  };

  updateDrink = drink => {
    this.api
      .update(drink)
      .then(drinkValues => drink.updateFromServer(drinkValues));
  };

  deleteDrink = drink => {
    this.drinks.remove(drink);
    this.api.delete(drink);
  };
}

decorate(DrinkStore, {
  drinks: observable,
  addDrink: action,
  deleteDrink: action,
  updateDrink: action
});

export default DrinkStore;
