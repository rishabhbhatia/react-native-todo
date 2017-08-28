import React, {Component} from 'react';
import { StyleSheet, FlatList, ListItem, View, Platform, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { NavigationActions } from 'react-navigation';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

import Title from '../components/Title';
import Input from '../components/Input';


class ActiveTodosScreen extends Component {

  renderActiveTodosListItem = (value) => {
    const {dispatch, todosReducer} = this.props;
    const {active} = todosReducer;
    const {todos, editModeIndex} = active;

    const todo = value.item;
    const {text, isChecked} = todo;

    const {completeTodo, onTodoEdited, turnOnEditMode, deleteActiveTodo} = this.props;

    console.log('renderActiveTodosListItem editModeIndex', editModeIndex.index);
    console.log('renderActiveTodosListItem value', value.index);
    console.log('renderActiveTodosListItem statement', editModeIndex.index == value.index);

    return (

      <Animatable.View
        key={todo.id}
        ref={todo.id}
        style={styles.item} >

          <CheckBox
            style={styles.checkbox}
            checked={isChecked}
            onPress={() => {
              completeTodo(value.index);
              deleteActiveTodo(value.index);
            }} />

          <TextInput
             style={styles.text}
             defaultValue={text}
             editable={editModeIndex.index == value.index}
             onSubmitEditing={(event) => onTodoEdited(event.nativeEvent.text, value.index)} />

          <View style={styles.actions} >

            <Icon
              style={styles.icon}
              name="pencil"
              size={15}
              onPress={() => turnOnEditMode(value.index)} />

            <Icon
               style={styles.icon}
               name="trash" size={15}
               onPress={() => deleteActiveTodo(value.index)} />

          </View>

      </Animatable.View>
    );
  }

  render() {
    const {todosReducer, addTodo} = this.props;
    const {active} = todosReducer;
    const {todos} = active;

    return (
      <View style={styles.container} >

        { Title('My Todo List!') }

        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={addTodo} />

        <FlatList
          data={todos}
          renderItem={this.renderActiveTodosListItem}
          keyExtractor={todo => todo.id}
          extraData={this.props} />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1
  },
  item: {
    backgroundColor: 'whitesmoke',
    padding: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: 5,
  },
  text: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    padding: 5,
  }
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TodoActionCreators, dispatch);
}

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTodosScreen)
