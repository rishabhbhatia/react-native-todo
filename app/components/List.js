import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class List extends Component {

  renderItem = (text, i) => {
    const {editModeIndex} = this.props;
    const index = editModeIndex.index;

    const {onPressItem} = this.props;
    const {onDeleteTodo} = this.props;
    const {onEditTodo} = this.props;
    const {onTodoEdited} = this.props;
    const {onTodoCompleted} = this.props;

    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onPress={() => onPressItem(i)} >
          {index == i ? <TextInput style={{ flex:1 }} defaultValue={text}
             onSubmitEditing={(event) => onTodoEdited(event.nativeEvent.text,i)} /> : <Text>{text}</Text>}

          <View style={styles.actions}>
            <Icon onPress={() => onEditTodo(i)} style={styles.icon} name="pencil" size={15} />
            <Icon onPress={() => onDeleteTodo(i)} style={styles.icon} name="trash" size={15} />
          </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {list} = this.props
    console.log('list render:', this.props);

    return (
      <View>
        {list.map(this.renderItem)}
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
