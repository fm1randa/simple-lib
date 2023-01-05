import { find, remove } from 'lodash';

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
      return acc + item.quantity * item.product.price;
    }, 0);
  }
  remove(product) {
    remove(this.items, { product });
  }

  checkout() {
    return {
      total: this.getTotal(),
      items: this.items,
    };
  }
}
