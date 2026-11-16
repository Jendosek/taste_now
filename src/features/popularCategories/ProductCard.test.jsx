import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import ProductCard from './ProductCard';

const product = {
  id: 'p1',
  category: 'pizzas',
  title: 'Pepperoni Pizza',
  description: 'Classic favorite with spicy pepperoni.',
  price: 11.99,
  rating: 5,
  imageUrl: '/products/pizzas/pepperoni_pizza.png',
  availableToppings: [
    { name: 'Extra Mozzarella', price: 2 },
    { name: 'Hot Chili Peppers', price: 0.5 },
  ],
};

const renderCard = () => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(
    <Provider store={store}>
      <ProductCard product={product} />
    </Provider>
  );
  return store;
};

describe('ProductCard', () => {
  it('shows product info and base price', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: 'Pepperoni Pizza' })).toBeInTheDocument();
    expect(screen.getByText('$11.99')).toBeInTheDocument();
    expect(screen.queryByText('Add Extra Toppings:')).not.toBeInTheDocument();
  });

  it('updates the price when toppings are selected', () => {
    renderCard();
    fireEvent.click(screen.getByAltText('Pepperoni Pizza'));

    fireEvent.click(screen.getByRole('checkbox', { name: /extra mozzarella/i }));
    expect(screen.getByText('$13.99')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox', { name: /hot chili peppers/i }));
    expect(screen.getByText('$14.49')).toBeInTheDocument();
  });

  it('adds the product with selected toppings to the cart and resets the card', () => {
    const store = renderCard();
    fireEvent.click(screen.getByAltText('Pepperoni Pizza'));
    fireEvent.click(screen.getByRole('checkbox', { name: /extra mozzarella/i }));

    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

    const { items, totalPrice } = store.getState().cart;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: 'p1',
      price: 13.99,
      selectedToppings: [{ name: 'Extra Mozzarella', price: 2 }],
    });
    expect(totalPrice).toBe(13.99);

    expect(screen.getByText('$11.99')).toBeInTheDocument();
    expect(screen.queryByText('Add Extra Toppings:')).not.toBeInTheDocument();
  });
});
