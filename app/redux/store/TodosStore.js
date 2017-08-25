import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';

import AppReducer from '../reducers/AppReducer';

const todosStore = createStore(AppReducer, undefined, autoRehydrate());

persistStore(todosStore, {storage: AsyncStorage});
// purgeStoredState({storage: AsyncStorage})  // Clear persistStore

export default todosStore;
