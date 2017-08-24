import React from 'react'
import { AppRegistry, View } from 'react-native'

import { Provider } from 'react-redux'

import App from './App'
import todoStore from './app/redux/store/TodoStore'

const AppWithStore = () => (
  <Provider store={todoStore}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('main', () => AppWithStore)
