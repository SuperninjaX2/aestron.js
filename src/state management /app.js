// Define initial state
const initialState = {
  counter: 0,
  username: "Guest"
};

// Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return {
        ...state,
        counter: state.counter + 1
      };
    case "DECREMENT_COUNTER":
      return {
        ...state,
        counter: state.counter - 1
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
}

// Create store with initial state and reducer function
const store = createStore(initialState, reducer);

// Subscribe to store changes and update DOM
store.subscribe(() => {
  const state = store.getState();
  document.getElementById("counter").innerText = state.counter;
  document.getElementById("username").innerText = state.username;
});

// Dispatch actions to update store state
document.getElementById("increment").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT_COUNTER" });
});

document.getElementById("decrement").addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT_COUNTER" });
});

document.getElementById("set-username").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username-input").value;
  store.dispatch({ type: "SET_USERNAME", payload: username });
});
