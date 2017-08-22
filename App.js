import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import todoStore from './app/redux/store/TodoStore'

import TODO_ACTIONS from './app/redux/actions/TodoActions';

import Title from './app/components/Title';
import Input from './app/components/Input';


export default class App extends React.Component {

  onAddTodo = (todo) => {
    const {store} = this.props;
    console.log(store);

    let add_todo_action = TODO_ACTIONS.add_todo_action(todo);
    todoStore.dispatch(add_todo_action);
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>My Todo List!</Title>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
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
