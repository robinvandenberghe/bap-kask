import Order from "../models/Order";
import { computed, decorate, observable, action, configure } from "mobx";

configure({ enforceActions: `observed` });
class OrderStore {
  orders = [];

  removeOrder = order => {
    this.orders.remove(order);
  };

  orderDrink = drink => {
    const order = this.orders.find(check => check.drink.id === drink.id);
    if (!order) {
      this.orders.push(new Order(drink, this.removeOrder));
    } else {
      order.increment();
    }
  };

  get total() {
    if (this.orders) {
      return this.orders.reduce((acc, cv) => (acc += cv.total), 0);
    }
    return 0;
  }
}
decorate(OrderStore, {
  orders: observable,
  removeOrder: action,
  orderDrink: action,
  total: computed
});

export default OrderStore;
