import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import config from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/TodoRowItemStyles';

export default class TodoRowItem extends Component {

  render() {
    const {todo, time} = this.props;
    const {text} = todo;

    return (
      <View style={styles.row} key={todo.id}>
        <View style={styles.timeline}>
          <View style={styles.timelineVerticalLink} />
          <Icon
             style={styles.icon}
             name={config.icons.circle}
             size={config.constants.row_timeline_icon_size}
           />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  };
};
