import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;

class ListRowCompleted extends Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onRemove = (index) => {
    const { deleteCompletedTodo } = this.props;
    if (deleteCompletedTodo) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => deleteCompletedTodo(index));
    }
  };

  render() {
    const {todo, index} = this.props;
    const {text} = todo;

    const {deleteCompletedTodo} = this.props;

    return (
      <View style={styles.row} key={todo.id} >
        <View style={styles.timeline}>
          <View style={styles.timelineVerticalLink} />
          <Icon
             style={styles.icon}
             name="circle" size={6}
           />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>{todo.text}</Text>
          <Text style={styles.time}>{moment().startOf('hour').fromNow()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#313842',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  timeline: {
    height: ROW_HEIGHT,
    width: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineVerticalLink: {
    height: ROW_HEIGHT,
    width: 1,
    backgroundColor: '#526373',
    justifyContent: 'center'
  },
  icon: {
    color: '#e7d629',
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  time: {
    fontSize: 10,
    fontWeight: '400',
    color: '#828B7B',
  }
});


export default ListRowCompleted;
