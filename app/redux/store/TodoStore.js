import {AsyncStorage} from 'react-native'
import { createStore } from 'redux'
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist'

import AppReducer from '../reducers/AppReducer'

const todoStore = createStore(AppReducer, undefined, autoRehydrate());

persistStore(todoStore, {storage: AsyncStorage});
// purgeStoredState({storage: AsyncStorage})  // Clear persistStore

export default todoStore;
