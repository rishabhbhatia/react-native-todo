import { combineReducers } from 'redux';

import todosReducer from './TodosReducer';
import navReducer from './NavReducer';


const appReducer = combineReducers({
  todosReducer,
  nav: navReducer,
});

export default appReducer;
