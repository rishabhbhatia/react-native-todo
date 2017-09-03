import React from 'react';
import { TabBarBottom, addNavigationHelpers, TabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import ActiveTodosScreen from '../containers/ActiveTodosScreen';
import CompletedTodosScreen from '../containers/CompletedTodosScreen';

const tabBarConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#e7d629',
    showLabel: true,
    showIcon: true,
    style: {
      padding: 5,
      backgroundColor: '#313842'
    },
    labelStyle: {
      fontSize: 12
    },
  }
};

const AppNavigator = TabNavigator({
  ActiveTodos: {
    screen: ActiveTodosScreen,
    navigationOptions: {
      tabBarLabel: 'Active',
      tabBarIcon: ({tintColor, focused}) => (
         <Icon name="pencil-square-o" size={18} style={{ color: tintColor }} />
      )
    }
  },
  CompletedTodos: {
    screen: CompletedTodosScreen,
    navigationOptions: {
      tabBarLabel: 'Completed',
      tabBarIcon: ({tintColor, focused}) => (
         <Icon name="check-square-o" size={18} style={{ color: tintColor }} />
      )
    }
  },
}, tabBarConfig);

export default AppNavigator;
