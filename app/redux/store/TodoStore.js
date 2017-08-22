import { createStore } from 'redux'

import todoReducer from '../reducers/todoListReducer'


const todoStore = createStore(todoReducer);

export default todoStore;
