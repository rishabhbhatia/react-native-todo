import React from 'react'
import { AppRegistry, View } from 'react-native'

import App from './App'
import todoStore from './app/redux/store/TodoStore'

const AppWithStore = () => <App store={todoStore} />

AppRegistry.registerComponent('main', () => AppWithStore)
