import { combineReducers } from 'redux';

import todosReducer from './TodosReducer';
import navReducer from './NavReducer';


const AppReducer = combineReducers({
  todosReducer,
  nav: navReducer,
});

export default AppReducer;
