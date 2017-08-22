import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux'

import todoStore from './app/redux/store/TodoStore'

import TODO_ACTIONS from './app/redux/actions/TodoActions';

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';


class App extends React.Component {

  onAddTodo = (todo) => {
    const {dispatch} = this.props;

    let add_todo_action = TODO_ACTIONS.add_todo_action(todo);
    dispatch(add_todo_action);
  }

  onTodoClicked = (index) => {
    console.log('onTodoClicked', index);
  }

  onDeleteTodo = (index) => {
    const {dispatch} = this.props;

    let todo_delete_action = TODO_ACTIONS.delete_todo_action(index);
    dispatch(todo_delete_action);
  }

  onEditTodo = (index) => {
    console.log('onEditTodo', index);
  }

  onCompletedTodo = (index) => {
    console.log('onCompletedTodo', index);
  }

  render() {
    const {todos} = this.props;

    return (
      <View style={styles.container}>
        <Title>My Todo List!</Title>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={todos}
          onPressItem={this.onTodoClicked}
          onDeleteTodo={this.onDeleteTodo}
          onEditTodo={this.onEditTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
  },
});

const mapStateToProps = (state) => ({
  todos: state.todos,
})

export default connect(mapStateToProps)(App)
