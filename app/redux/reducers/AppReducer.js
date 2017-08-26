import { combineReducers } from 'redux';

import todosReducer from './TodosReducer'
import navReducer from './NavReducer'

// import activeTodosReducer from './ActiveTodosReducer'
// import completedTodosReducer from './CompletedTodosReducer'

// till expo has better database support
// const AppReducer = combineReducers({
//   activeTodosReducer,
//   completedTodosReducer,
//   nav: navReducer,
// });

const AppReducer = combineReducers({
  todosReducer,
  nav: navReducer,
});

export default AppReducer;
