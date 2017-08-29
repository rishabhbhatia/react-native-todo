import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Platform , Animated} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import Title from '../components/Title';
import Input from '../components/Input';
import ListRowActive from '../components/ListRowActive';


const firstRender = true;

class ActiveTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {active} = todosReducer;
    const {todos, editModeIndex} = active;

    let actions = bindActionCreators(TodoActionCreators, dispatch)

    return (
      <View style={styles.container} >
        {Title('My Todo List!')}
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={actions.addTodo}
        />
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          extraData={this.props}
          renderItem={({ item, index }) => (
          <ListRowActive
            todo={{...item}}
            editModeIndex={editModeIndex}
            index={index}
            {...actions}
          />
        )}
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
