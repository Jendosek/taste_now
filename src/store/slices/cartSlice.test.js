import { describe, it, expect } from 'vitest';
import cartReducer, { addItem, removeItem, clearCart, setCart } from './cartSlice';

const pizza = {
  id: 'p1',
  title: 'Pepperoni Pizza',
  category: 'pizzas',
  description: 'Classic favorite',
  imageUrl: '/products/pizzas/pepperoni_pizza.png',
  price: 11.99,
};

const emptyCart = cartReducer(undefined, { type: '@@INIT' });

const withToppings = (product, toppings) => ({
  ...product,
  price: product.price + toppings.reduce((sum, t) => sum + t.price, 0),
  selectedToppings: toppings,
});

describe('cartSlice', () => {
  it('starts empty', () => {
    expect(emptyCart).toEqual({ items: [], totalQuantity: 0, totalPrice: 0 });
  });

  it('adds a new product as a cart line', () => {
    const state = cartReducer(emptyCart, addItem(pizza));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: 'p1', quantity: 1, totalPrice: 11.99 });
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(11.99);
  });

  it('increases quantity when the same product is added again', () => {
    let state = cartReducer(emptyCart, addItem(pizza));
    state = cartReducer(state, addItem(pizza));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].totalPrice).toBe(23.98);
    expect(state.totalQuantity).toBe(2);
  });

  it('keeps the same product with different toppings as separate lines', () => {
    const cheese = { name: 'Extra Mozzarella', price: 2 };
    let state = cartReducer(emptyCart, addItem(pizza));
    state = cartReducer(state, addItem(withToppings(pizza, [cheese])));

    expect(state.items).toHaveLength(2);
    expect(state.items[1].selectedToppings).toEqual([cheese]);
    expect(state.totalPrice).toBe(25.98);
  });

  it('treats the same toppings in a different order as the same line', () => {
    const a = { name: 'BBQ Sauce', price: 1 };
    const b = { name: 'Garlic Dip', price: 1 };
    let state = cartReducer(emptyCart, addItem(withToppings(pizza, [a, b])));
    state = cartReducer(state, addItem(withToppings(pizza, [b, a])));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('decreases quantity and removes the line at zero', () => {
    let state = cartReducer(emptyCart, addItem(pizza));
    state = cartReducer(state, addItem(pizza));
    const { cartId } = state.items[0];

    state = cartReducer(state, removeItem(cartId));
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalPrice).toBe(11.99);

    state = cartReducer(state, removeItem(cartId));
    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('ignores removing an unknown line', () => {
    const state = cartReducer(emptyCart, addItem(pizza));
    expect(cartReducer(state, removeItem('missing'))).toEqual(state);
  });

  it('keeps totals at cent precision', () => {
    const cheap = { ...pizza, id: 'x', price: 0.1 };
    let state = emptyCart;
    for (let i = 0; i < 3; i++) state = cartReducer(state, addItem(cheap));

    // 0.1 + 0.1 + 0.1 would be 0.30000000000000004 without rounding
    expect(state.totalPrice).toBe(0.3);
    expect(state.items[0].totalPrice).toBe(0.3);
  });

  it('clears the cart', () => {
    let state = cartReducer(emptyCart, addItem(pizza));
    state = cartReducer(state, clearCart());
    expect(state).toEqual(emptyCart);
  });

  it('replaces the cart with a saved one', () => {
    const saved = { items: [{ cartId: 'p1-', quantity: 3 }], totalQuantity: 3, totalPrice: 35.97 };
    expect(cartReducer(emptyCart, setCart(saved))).toEqual(saved);
  });
});
