import { createListenerMiddleware } from '@reduxjs/toolkit';

const CART_KEY = 'cart';
const USER_KEY = 'user';

// localStorage can throw (private mode, quota, blocked storage) and may hold
// corrupted JSON, so every access is guarded and falls back to defaults.
const readJSON = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

const writeJSON = (key, value) => {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is a convenience; the app keeps working without it.
  }
};

// State restored on page load (passed to configureStore as preloadedState).
export const loadPersistedState = () => {
  const preloaded = {};

  const cart = readJSON(CART_KEY);
  if (cart && Array.isArray(cart.items)) {
    preloaded.cart = cart;
  }

  const user = readJSON(USER_KEY);
  if (user && user.uid) {
    preloaded.auth = { user, isAuthenticated: true };
  }

  return preloaded;
};

// Saves the cart and the signed-in user whenever they change.
export const persistenceMiddleware = createListenerMiddleware();

persistenceMiddleware.startListening({
  predicate: (_action, current, previous) => current.cart !== previous.cart,
  effect: (_action, api) => writeJSON(CART_KEY, api.getState().cart),
});

persistenceMiddleware.startListening({
  predicate: (_action, current, previous) => current.auth.user !== previous.auth.user,
  effect: (_action, api) => writeJSON(USER_KEY, api.getState().auth.user),
});
