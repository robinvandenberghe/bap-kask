import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class Order {
  constructor(drink, removeOrder) {
    this.id = uuid.v4();
    this.drink = drink;
    this.amount = 1;
    this.killMe = removeOrder;
  }

  increment = () => {
    this.amount++;
  };

  decrement = () => {
    this.amount--;
    if (this.amount === 0) {
      this.killMe(this);
    }
  };

  get total() {
    return this.amount * this.drink.price;
  }
}

decorate(Order, {
  drink: observable,
  amount: observable,
  increment: action,
  decrement: action,
  total: computed
});

export default Order;
