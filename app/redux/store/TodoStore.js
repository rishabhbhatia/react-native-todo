import {AsyncStorage} from 'react-native'
import { createStore } from 'redux'
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist'

import todoReducer from '../reducers/todoListReducer'


const todoStore = createStore(todoReducer, undefined, autoRehydrate());

persistStore(todoStore, {storage: AsyncStorage});
// purgeStoredState({storage: AsyncStorage})  // Clear persistStore

export default todoStore;
