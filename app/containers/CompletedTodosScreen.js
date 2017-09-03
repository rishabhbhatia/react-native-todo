import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, ListView, View, Platform, Dimensions, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';
import SwipeListView from '../lib';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import Title from '../components/Title';
import ListRowCompleted from '../components/ListRowCompleted';

import commonStyles from './styles';


class CompletedTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos} = completed;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let actions = bindActionCreators(TodoActionCreators, dispatch);

    this.rightOpenValue = -Dimensions.get('window').width;

    return (
      <View style={commonStyles.container}>
        { Title(config.constants.completed_todos_screen.title)  }
        <SwipeListView
          dataSource={ds.cloneWithRows(todos)}
          keyExtractor={todo => todo.id}
          extraData={this.props}
          enableEmptySections={true}
          renderRow={ (item, secId, rowId) => (
            <ListRowCompleted
              todo={{...item}}
              index={rowId}
              {...actions}
            />
          )}
          renderRightRow={data => (
    				<View style={commonStyles.rowRight}>
               <Icon
                  style={commonStyles.icon}
                  name={config.icons.times}
                  size={config.constants.hidden_row_icon_size}
                />
    				</View>
    			)}
          renderSeparator={(sectionId, rowId) => (
            <View
              key={rowId}
              style={commonStyles.separator} />
            )}
          swipeDuration={config.constants.row_swipe_duration}
          swipeToOpenPercent={config.constants.row_swipe_open_percent}
          disableRightSwipe={config.constants.completed_todos_screen.disable_right_swipe}
          rightOpenValue={this.rightOpenValue}
          onSwipeLeftComplete={actions.deleteCompletedTodo}
         />
      </View>
    );
  };

};

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
});

export default connect(mapStateToProps)(CompletedTodosScreen);
