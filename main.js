import React from 'react'
import { AppRegistry, View } from 'react-native'

import { Provider } from 'react-redux'

import App from './App'
import todosStore from './app/redux/store/TodosStore'

const AppWithStore = () => (
  <Provider store={todosStore}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('main', () => AppWithStore)
