import StateManager from './StateManager.js';

const initialState = { count: 0 };
const stateManager = new StateManager(initialState);

const unsubscribe = stateManager.subscribe(state => {
  console.log('State updated!', state);
});

stateManager.setState({ count: 1 }); // logs "State updated! { count: 1 }"
stateManager.setState({ count: 2 }); // logs "State updated! { count: 2 }"

unsubscribe();

stateManager.setState({ count: 3 }); // does not log anything, since there are no listeners
