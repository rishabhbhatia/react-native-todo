import React, {Component} from 'react';
import { StyleSheet, FlatList, ListItem, TextInput, View, Platform } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { NavigationActions } from 'react-navigation';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../config';

import Title from '../components/Title';

class CompletedTodosScreen extends Component {

  renderCompletedTodosList = (value) => {
    const {dispatch, todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos, editModeIndex} = completed;

    const todo = value.item;
    const {text} = todo;

    const {deleteCompletedTodo, onTodoEdited} = this.props;

    return (
      <View
        key={todo.id}
        style={styles.item} >

          <TextInput
            style={styles.text}
            defaultValue={text}
            editable={false} />

          <View style={styles.actions}>

            <Icon
              name="times"
              size={15}
              style={styles.icon}
              onPress={() => deleteCompletedTodo(value.index)} />

          </View>

      </View>
    );
  }

  render() {
    const {todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos} = completed;

    return (
      <View style={styles.container}>

        {Title('Compeleted Todos!')}

        <FlatList
          data={todos}
          renderItem={this.renderCompletedTodosList}
          keyExtractor={todo => todo.id} />

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

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTodosScreen)
