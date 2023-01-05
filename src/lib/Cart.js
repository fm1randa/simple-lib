import { find, remove } from 'lodash';
import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];
  add(item) {
    const query = { product: item.product };
    if (find(this.items, query)) {
      remove(this.items, query);
    }
    this.items.push(item);
  }
  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (
        item.condition &&
        item.condition.percentage &&
        item.quantity > item.condition.minimum
      ) {
        discount = amount.percentage(item.condition.percentage);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }
  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
