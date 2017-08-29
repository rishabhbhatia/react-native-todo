import React, {Component} from 'react';
import { StyleSheet, FlatList, ListItem, TextInput, View, Platform } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import config from '../config';

import Title from '../components/Title';
import ListRowCompleted from '../components/ListRowCompleted';


class CompletedTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos} = completed;

    let actions = bindActionCreators(TodoActionCreators, dispatch)

    return (
      <View style={styles.container}>
        {Title('Compeleted Todos!')}
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          extraData={this.props}
          renderItem={({ item, index }) => (
          <ListRowCompleted
            todo={{...item}}
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

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps)(CompletedTodosScreen)
