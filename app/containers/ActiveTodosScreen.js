import React, {Component} from 'react';
import { Text, ListView, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';
import SwipeListView from '../lib';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import Title from '../components/Title';
import Input from '../components/Input';
import ListRowActive from '../components/ListRowActive';
import DateView from '../components/DateView';

import styles from './styles/ActiveTodosStyles';
import commonStyles from './styles';

class ActiveTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {active} = todosReducer;
    const {todos, editModeIndex} = active;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let actions = bindActionCreators(TodoActionCreators, dispatch);

    this.leftOpenValue = Dimensions.get('window').width;
    this.rightOpenValue = -Dimensions.get('window').width;

    return (
      <View style={commonStyles.container} >
        { Title(config.constants.active_screen.title) }
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <Input
              placeholder={config.constants.active_screen.add_todo_placeholder}
              placeholderTextColor={config.colors.white}
              selectionColor={config.colors.golden}
              underlineColorAndroid={config.colors.transparent}
              maxLength={config.constants.active_screen.add_todo_input_maxlength}
              clearTextOnFocus={config.constants.active_screen.add_todo_input_clear_text_on_focus}
              onSubmitEditing={actions.addTodo}
            />
          </View>
          <DateView />
        </View>
        <SwipeListView
          dataSource={ds.cloneWithRows(todos)}
          keyExtractor={todo => todo.id}
          enableEmptySections={true}
          renderRow={(item, secId, rowId) => (
            <ListRowActive
              todo={{...item}}
              index={rowId}
              {...actions}
            />
          )}
          renderLeftRow={data => (
    				<View style={commonStyles.rowLeft}>
              <Icon
                 style={commonStyles.icon}
                 name={config.icons.check}
                 size={config.constants.hidden_row_icon_size}
               />
    				</View>
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
          leftOpenValue={this.leftOpenValue}
          rightOpenValue={this.rightOpenValue}
          onSwipeLeftComplete={actions.deleteActiveTodo}
          onSwipeRightComplete={(rowId) => {
            actions.completeTodo(rowId);
            actions.deleteActiveTodo(rowId);
          }}
         />
      </View>
    );
  };

};

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
});

export default connect(mapStateToProps)(ActiveTodosScreen);
