import React from 'react';
import { TabBarBottom, addNavigationHelpers, TabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config';

import ActiveTodosScreen from '../containers/ActiveTodosScreen';
import CompletedTodosScreen from '../containers/CompletedTodosScreen';

const tabBarConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: config.navigation.tab_bar_position,
  swipeEnabled: config.navigation.swipe_enabled,
  animationEnabled: config.navigation.animation_enabled,
  lazy: config.navigation.lazy,
  tabBarOptions: {
    activeTintColor: config.colors.golden,
    showLabel: config.navigation.show_label,
    showIcon: config.navigation.show_icon,
    style: {
      padding: config.navigation.tab_padding,
      backgroundColor: config.colors.dim_gray
    },
    labelStyle: {
      fontSize: config.navigation.label_font_size
    },
  }
};

const AppNavigator = TabNavigator({
  ActiveTodos: {
    screen: ActiveTodosScreen,
    navigationOptions: {
      tabBarLabel: config.navigation.label_active,
      tabBarIcon: ({tintColor, focused}) => (
         <Icon
           name={config.icons.pencil_square}
           size={config.navigation.tab_icon_size}
           style={{ color: tintColor }} />
      )
    }
  },
  CompletedTodos: {
    screen: CompletedTodosScreen,
    navigationOptions: {
      tabBarLabel: config.navigation.label_completed,
      tabBarIcon: ({tintColor, focused}) => (
         <Icon
           name={config.icons.check_square}
           size={config.navigation.tab_icon_size}
           style={{ color: tintColor }} />
      )
    }
  },
}, tabBarConfig);

export default AppNavigator;
