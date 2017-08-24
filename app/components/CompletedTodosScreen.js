import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import todosConfig from '../config/todosConfig';
import completedTodosHelper from '../helpers/CompletedTodosHelper';

import Title from './Title';
import List from './List';

class CompletedTodosScreen extends Component {

  render() {
    const {completedTodosReducer} = this.props;
    const {todos} = completedTodosReducer;

    const type = todosConfig.todos.types.completed;

    return (
      <View style={styles.container}>
        <Title>Compeleted Todos!</Title>
        <List
          todos={todos}
          type={type}
          onDeleteTodo={completedTodosHelper.onDeleteTodo.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1
  },
});

const mapStateToProps = (state) => ({
  completedTodosReducer: state.completedTodosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps)(CompletedTodosScreen)
