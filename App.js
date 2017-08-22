import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import todoStore from './app/redux/store/TodoStore'

import TODO_ACTIONS from './app/redux/actions/TodoActions';

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';


export default class App extends React.Component {

  componentWillMount() {
    const {store} = this.props;

    const {todos} = store.getState();
    this.setState({todos})

    this.unsubscribe = store.subscribe(() => {
      const {todos} = store.getState();
      this.setState({todos});
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onAddTodo = (todo) => {
    const {store} = this.props;
    console.log(store);

    let add_todo_action = TODO_ACTIONS.add_todo_action(todo);
    todoStore.dispatch(add_todo_action);
  }

  onTodoClicked = (index) => {
    this.onDeleteTodo(index);
  }

  onDeleteTodo = (index) => {
    let todo_delete_action = TODO_ACTIONS.delete_todo_action(index);
    todoStore.dispatch(todo_delete_action);
  }

  render() {
    const {todos} = this.state;

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
