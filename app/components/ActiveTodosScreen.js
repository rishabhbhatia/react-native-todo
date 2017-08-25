import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import todosConfig from '../config/todosConfig';
import activeTodosHelper from '../helpers/ActiveTodosHelper';

import Title from './Title';
import Input from './Input';
import List from './List';

class ActiveTodosScreen extends Component {

  // let {navigation} = this.props;
  // let {dispatch} = navigation;
  //
  // dispatch(NavigationActions.navigate({ routeName: 'CompletedTodos' }))  // sample navigation code

  render() {
    const {activeTodosReducer} = this.props;

    const {todos} = activeTodosReducer;
    const {editModeIndex} = activeTodosReducer;

    const type = todosConfig.todos.types.active;

    return (
      <View style={styles.container}>
        {Title('My Todo List!')}
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={activeTodosHelper.onAddTodo.bind(this)}
        />
        <List
          todos={todos}
          type={type}
          editModeIndex={editModeIndex.index}
          onPressItem={activeTodosHelper.onTodoClicked.bind(this)}
          onDeleteTodo={activeTodosHelper.onDeleteTodo.bind(this)}
          onEditTodo={activeTodosHelper.onEditTodo.bind(this)}
          onTodoEdited={activeTodosHelper.onTodoEdited.bind(this)}
          onTodoCompletionToggled={activeTodosHelper.onTodoCompletionToggled.bind(this)}
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
  activeTodosReducer: state.activeTodosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps)(ActiveTodosScreen)
