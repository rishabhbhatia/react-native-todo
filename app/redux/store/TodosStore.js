import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';

import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';

import appReducer from '../reducers/AppReducer';


const todosStore = createStore(
  appReducer,
  undefined,
  autoRehydrate()
  );

// persistStore(todosStore, {storage: AsyncStorage});
purgeStoredState({storage: AsyncStorage})  // Clear persistStore

export default todosStore;
