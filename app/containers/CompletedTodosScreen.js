import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, ListView, View, Platform, Dimensions, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwipeListView from '../lib';

import * as TodoActionCreators from '../redux/actions/TodoActionCreators';

import Title from '../components/Title';
import ListRowCompleted from '../components/ListRowCompleted';


class CompletedTodosScreen extends Component {

  render() {
    const {dispatch, todosReducer} = this.props;
    const {completed} = todosReducer;
    const {todos} = completed;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let actions = bindActionCreators(TodoActionCreators, dispatch)

    return (
      <View style={styles.container}>
        {Title('Compeleted Todos!')}
        <SwipeListView
          dataSource={ds.cloneWithRows(todos)}
          keyExtractor={todo => todo.id}
          extraData={this.props}
          enableEmptySections={true}
          renderRow={( item, secId, rowId ) => (
            <ListRowCompleted
              todo={{...item}}
              index={rowId}
              {...actions}
            />
          )}
          renderRightRow={ data => (
    				<View style={styles.rowRight}>
               <Icon
                  style={styles.icon}
                  name="times" size={20}
                />
    				</View>
    			)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          swipeDuration={200}
          disableRightSwipe={true}
          closeOnRowBeginSwipe={true}
          swipeToOpenPercent={40}
          rightOpenValue={-Dimensions.get('window').width}
          onSwipeLeftComplete={actions.deleteCompletedTodo}
         />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1,
    backgroundColor: '#1B2127',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FE4D33'
  },
  icon: {
    color: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#182129',
  }
  });

const mapStateToProps = (state) => ({
  todosReducer: state.todosReducer,
  nav: state.nav,
})

export default connect(mapStateToProps)(CompletedTodosScreen)
