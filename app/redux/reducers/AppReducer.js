import { combineReducers } from 'redux';

import activeTodosReducer from './ActiveTodosReducer'
import completedTodosReducer from './CompletedTodosReducer'
import navReducer from './NavReducer'

const AppReducer = combineReducers({
  activeTodosReducer,
  completedTodosReducer,
  nav: navReducer,
});

export default AppReducer;
