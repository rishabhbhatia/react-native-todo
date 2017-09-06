import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, ListView, View, Platform, Dimensions, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import SwipeView from 'react-native-swipeview';

import config from '../config';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import Title from '../components/Title';
import TodoRowItem from '../components/TodoRowItem';

import commonStyles from './styles';


class CompletedTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos} = completed;

    const {deleteCompletedTodo} = this.props;

    this.rightOpenValue = -Dimensions.get('window').width;

    return (
      <View style={commonStyles.container}>
        { Title(config.constants.completed_todos_screen.title)  }
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          extraData={this.props}
          enableEmptySections={true}
          ItemSeparatorComponent={() => <View style={commonStyles.separator} />}
          renderItem={({item, index}) => (
            <SwipeView
              renderVisibleContent={() => (
                <TodoRowItem
                  todo={{...item}}
                  index={index}
                  time={moment().endOf('hour').fromNow()}
                />
              )}
              renderRightView={() => (
                <View style={commonStyles.rowRight}>
                   <Icon
                      style={commonStyles.icon}
                      name={config.icons.times}
                      size={config.constants.hidden_row_icon_size}
                    />
                </View>
        			)}
              rightOpenValue={this.rightOpenValue}
              swipeDuration={config.constants.row_swipe_duration}
              swipeToOpenPercent={config.constants.row_swipe_open_percent}
              disableSwipeToRight={config.constants.completed_todos_screen.disable_right_swipe}
              onSwipedLeft={() => deleteCompletedTodo(index)}
            />
          )}
         />
      </View>
    );
  };

};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TodoActionCreators, dispatch);
};

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTodosScreen);
