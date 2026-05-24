# Redux & React-Redux Toolkit — Tutorial (Project-Focused)

This tutorial explains Redux fundamentals, the React-Redux bindings, and Redux Toolkit (RTK), using this repository as a running example. It is written to help you understand how state is organized, updated, and consumed in this project.

Table of contents
- Introduction
- Key concepts (Store, Actions, Reducers, Selectors, Middleware)
- React-Redux basics (Provider, useSelector, useDispatch)
- Redux Toolkit (createSlice, configureStore, createAsyncThunk)
- Project walkthrough — where things live and how they connect
- Practical examples (dispatching actions, async flows)
- Tips, patterns, and further reading

Prerequisites
- Node/npm installed
- Basic React knowledge
- To run this project locally:

```bash
npm install
npm run dev
```

1. Introduction

Redux is a predictable state container for JavaScript apps. It centralizes application state into a single immutable store and updates state via plain objects called actions. React-Redux connects Redux to React by providing a way to access state and dispatch actions from components.

Redux Toolkit (RTK) is the recommended way to write Redux logic today — it reduces boilerplate and includes useful utilities like `createSlice`, `configureStore`, and `createAsyncThunk`.

2. Key concepts

- Store: The single source of truth holding your app state. In this project, the store is created in [src/app/redux/store.js](src/app/redux/store.js#L1).
- State: The JavaScript object tree held in the store.
- Action: A plain object describing "what happened". Must have a `type` property; RTK `createSlice` generates action creators for you.
- Reducer: A function (state, action) => newState that describes how actions change state.
- Selector: A function to read a specific part of state (e.g., `state.cart.items`). Use `useSelector` in components.
- Middleware: Code that runs between dispatching an action and the moment it reaches the reducer (e.g., for logging, analytics, async handling). RTK includes `getDefaultMiddleware()` which wires up common middleware like `redux-thunk`.

3. React-Redux basics

- Provider: Wrap your React app with `<Provider store={store}>` so components can access the store. See how `main.jsx` mounts the app and where `Provider` is used.
- `useDispatch()`: Hook that returns the `dispatch` function. Use it to send actions.
- `useSelector(selector)`: Hook that reads data from the store and automatically subscribes the component to updates for the selected slice.

Example (component):

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './features/counterSlice';

function CounterUI() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
```

Related files in this project:
- [src/app/components/CounterUI.jsx](src/app/components/CounterUI.jsx#L1)
- [src/app/components/Cart.jsx](src/app/components/Cart.jsx#L1)
- [src/app/components/ProductCatalog.jsx](src/app/components/ProductCatalog.jsx#L1)

4. Redux Toolkit (RTK)

RTK simplifies common Redux tasks.

- `createSlice({ name, initialState, reducers })` creates a slice of state and auto-generates action creators and reducer functions.
- `configureStore({ reducer })` creates the store with good defaults (middleware, devtools) and accepts a slice reducer map.
- `createAsyncThunk()` helps manage async logic and lifecycle actions (`pending`, `fulfilled`, `rejected`).

Example slice (pattern):

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchItems = createAsyncThunk('catalog/fetch', async () => {
  const res = await fetch('/api/items');
  return res.json();
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => { state.status = 'loading'; })
      .addCase(fetchItems.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchItems.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
  }
});

export const { addItem } = catalogSlice.actions;
export default catalogSlice.reducer;
```

5. Project walkthrough — where things live

- Store setup: [src/app/redux/store.js](src/app/redux/store.js#L1)
  - `configureStore` should be used here to combine slice reducers (for example `counter`, `cart`, `auction`).
- Feature slices: [src/features/counterSlice.jsx](src/features/counterSlice.jsx#L1), [src/features/cartSlice.jsx](src/features/cartSlice.jsx#L1), [src/features/auctionSlice.jsx](src/features/auctionSlice.jsx#L1)
  - These `createSlice` implementations define the state shape and reducers used in components.
- Components: [src/app/components/*](src/app/components/)
  - `ProductCatalog.jsx` reads product data and may dispatch actions to add items to the cart.
  - `Cart.jsx` reads cart items via `useSelector` and dispatches actions to change quantity or remove items.
  - `Navbar.jsx` may show counts or links derived from state.

6. Practical examples (how this project uses Redux)

- Accessing state:

```jsx
const cartItems = useSelector(state => state.cart.items);
```

- Dispatching synchronous actions (from a UI handler):

```jsx
const dispatch = useDispatch();
dispatch(addToCart(product));
```

- Handling async flows (example using `createAsyncThunk`):

```jsx
// features/auctionSlice.jsx
export const fetchAuctions = createAsyncThunk('auctions/fetch', async () => {
  const r = await fetch('/api/auctions');
  return r.json();
});

// In component
useEffect(() => { dispatch(fetchAuctions()); }, [dispatch]);
```

7. Patterns & best practices (applied to this repo)

- Keep slices focused: one slice per domain area (cart, counter, auction).
- Keep components presentational where possible; move logic into thunks/selectors.
- Use selectors to encapsulate reading logic: `const selectCartTotal = state => state.cart.total`.
- Avoid deeply nested state updates outside reducers — RTK uses Immer so you can write "mutating" code inside reducers safely.
- Keep side effects (fetching, timers) in thunks or middleware, not inside reducers.

8. Troubleshooting & common tasks

- If state updates don't trigger renders: ensure you're selecting the right piece of state with `useSelector` and that the reducer returns a new value (RTK handles immutability for you).
- If actions are undefined: verify slice `export const { someAction } = slice.actions` and import correctly.

9. Further reading

- Redux docs: https://redux.js.org/
- React-Redux docs: https://react-redux.js.org/
- Redux Toolkit: https://redux-toolkit.js.org/

10. Quick checklist to apply changes in this repo

- Add or update a slice under `src/features/` using `createSlice`.
- Export the reducer and add it to the store in [src/app/redux/store.js](src/app/redux/store.js#L1).
- Use `Provider` in `main.jsx` so components can access the store.
- Use `useSelector` / `useDispatch` in components to read state and dispatch actions.

If you'd like, I can:
- Update `src/app/redux/store.js` to show a recommended `configureStore` example.
- Add example selectors and small unit tests for slices.

---

File added: `README_TUTORIAL.md`
