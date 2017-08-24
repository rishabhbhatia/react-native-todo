import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'

import todosConfig from '../config/todosConfig';

import { CheckBox } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class List extends Component {

  renderItem = (todo, i) => {
    const {text, isChecked} = todo;
    const {type} = this.props;
    const {editModeIndex} = this.props;

    const {onPressItem} = this.props;
    const {onDeleteTodo} = this.props;
    const {onEditTodo} = this.props;
    const {onTodoEdited} = this.props;
    const {onTodoCompletionToggled} = this.props;


    return (
      <View
        key={i}
        style={styles.item}
        onPress={() => onPressItem(i)} >

          {editModeIndex == i ? <TextInput style={{ flex:1 }} defaultValue={text}
              onSubmitEditing={(event) => onTodoEdited(event.nativeEvent.text,i)} /> :
              (type===todosConfig.todos.types.active) ? <CheckBox onPress={() => onTodoCompletionToggled(i)}
               style={{ flex:1 }} title={text} checked={isChecked} />  : null }

          {type===todosConfig.todos.types.completed ? <Text>{text}</Text> : null}

          <View style={styles.actions}>
            {type===todosConfig.todos.types.active ? <Icon onPress={() => onEditTodo(i)}
             style={styles.icon} name="pencil" size={15} /> : null}
            <Icon onPress={() => onDeleteTodo(i)} style={styles.icon} name={type===todosConfig.todos.types.active ? "trash" : "times" } size={15} />
          </View>

      </View>
    )
  }

  render() {
    const {todos} = this.props

    return (
      <ScrollView>
        {todos.map(this.renderItem)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1
  },
  item: {
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  }
})
