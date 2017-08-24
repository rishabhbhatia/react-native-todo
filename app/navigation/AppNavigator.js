import React from 'react';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import ActiveTodosScreen from '../components/ActiveTodosScreen';
import CompletedTodosScreen from '../components/CompletedTodosScreen';

const AppNavigator = TabNavigator({
  ActiveTodos: { screen: ActiveTodosScreen },
  CompletedTodos: { screen: CompletedTodosScreen },
});

export default AppNavigator;
