import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'

import { CheckBox } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';


export default class List extends Component {

  renderItem = (todo, i) => {
    let {text, isChecked} = todo;

    const {editModeIndex} = this.props;
    const index = editModeIndex.index;

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

          {index == i ? <TextInput style={{ flex:1 }} defaultValue={text}
              onSubmitEditing={(event) => onTodoEdited(event.nativeEvent.text,i)} /> : <CheckBox
              onPress={() => onTodoCompletionToggled(i)} style={{ flex:1 }} title={text}
              checked={isChecked} /> }

          <View style={styles.actions}>
            <Icon onPress={() => onEditTodo(i)} style={styles.icon} name="pencil" size={15} />
            <Icon onPress={() => onDeleteTodo(i)} style={styles.icon} name="trash" size={15} />
          </View>

      </View>
    )
  }

  render() {
    const {todos} = this.props

    return (
      <View>
        {todos.map(this.renderItem)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
