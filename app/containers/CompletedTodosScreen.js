import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import todosConfig from '../config/todosConfig';
import todosHelper from '../helpers/TodosHelper';

import Title from '../components/Title';
import List from '../components//List';

class CompletedTodosScreen extends Component {

  render() {
    const {todosReducer} = this.props;
    const {completed} = todosReducer;

    const {todos} = completed;

    const type = todosConfig.todos.types.completed;

    return (
      <View style={styles.container}>
        {Title('Compeleted Todos!')}
        <List
          todos={todos}
          type={type}
          onDeleteTodo={todosHelper.onDeleteCompletedTodo.bind(this)}
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
  todosReducer: state.todosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps)(CompletedTodosScreen)
