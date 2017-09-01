import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;

class ListRowActive extends Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentWillMount() {
    const {todo} = this.props;
    const {text} = todo;

    this.setState({ text: text});
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onRemove = (index) => {
    const { deleteActiveTodo } = this.props;
    if (deleteActiveTodo) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => deleteActiveTodo(index));
    }
  };

  render() {
    const {todo, index} = this.props;
    const {text, completed} = todo;

    const {completeTodo, deleteActiveTodo} = this.props;

    return (
      <View style={styles.row} key={todo.id} >
          <Text style={styles.text}>{todo.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  text: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
  }
});


export default ListRowActive;
