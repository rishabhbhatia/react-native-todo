import React from 'react';
import { TabBarBottom, addNavigationHelpers, TabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import ActiveTodosScreen from '../containers/ActiveTodosScreen';
import CompletedTodosScreen from '../containers/CompletedTodosScreen';

const tabBarConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: 'skyblue',
    showLabel: true,
    showIcon: true,
    labelStyle: {
      fontSize: 13
    },
  }
};

const AppNavigator = TabNavigator({
  ActiveTodos: {
    screen: ActiveTodosScreen,
    navigationOptions: {
        tabBarLabel: 'Active',
        tabBarIcon: ({tintColor, focused}) => (
           <Icon name="pencil-square-o" size={20} style={{ color: tintColor }} />
        )
      }
  },
  CompletedTodos: {
    screen: CompletedTodosScreen,
    navigationOptions: {
        tabBarLabel: 'Completed',
        tabBarIcon: ({tintColor, focused}) => (
           <Icon name="check-square-o" size={20} style={{ color: tintColor }} />
        )
      }
  },
}, tabBarConfig);

export default AppNavigator;
