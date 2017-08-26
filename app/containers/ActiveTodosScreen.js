import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import todosConfig from '../config/todosConfig';
import todosHelper from '../helpers/TodosHelper';

import Title from '../components/Title';
import Input from '../components/Input';
import List from '../components//List';

class ActiveTodosScreen extends Component {

  // let {navigation} = this.props;
  // let {dispatch} = navigation;
  //
  // dispatch(NavigationActions.navigate({ routeName: 'CompletedTodos' }))  // sample navigation code

  render() {
    console.log('ActiveTodosScreen', this.props);

    const {todosReducer} = this.props;
    const {active} = todosReducer;

    const {todos} = active;
    const {editModeIndex} = active;

    const type = todosConfig.todos.types.active;

    return (
      <View style={styles.container}>
        {Title('My Todo List!')}
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={todosHelper.onAddTodo.bind(this)}
        />
        <List
          todos={todos}
          type={type}
          editModeIndex={editModeIndex.index}
          onPressItem={todosHelper.onTodoClicked.bind(this)}
          onDeleteTodo={todosHelper.onDeleteActiveTodo.bind(this)}
          onEditTodo={todosHelper.onEditTodo.bind(this)}
          onTodoEdited={todosHelper.onTodoEdited.bind(this)}
          onTodoCompletionToggled={todosHelper.onTodoCompleted.bind(this)}
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

export default connect(mapStateToProps)(ActiveTodosScreen)
