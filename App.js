import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import todoStore from './app/redux/store/TodoStore'

import TODO_ACTIONS from './app/redux/actions/TodoActions';


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>My Todo List!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
