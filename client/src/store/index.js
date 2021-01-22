import OrderStore from "./OrderStore";
import DrinkStore from "./DrinkStore";
import UiStore from "./UiStore";

class Store {
  constructor() {
    this.uiStore = new UiStore(this);
    this.orderStore = new OrderStore(this);
    this.drinkStore = new DrinkStore(this);
  }
}

export default new Store();
