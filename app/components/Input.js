import React, { Component } from 'react';
import { Animated, View, TextInput, StyleSheet } from 'react-native';

export default class Input extends Component {

  state = {
    text: '',
  }

  onChangeText = (text) => this.setState({text})

  onSubmitEditing = () => {
    const {onSubmitEditing} = this.props
    const {text} = this.state

    if (!text) return // return if empty

    onSubmitEditing(text)
    this.setState({text: ''})
  }

  onFocus = () => {
    console.log('Focussed');
  }

  onBlur = () => {
    console.log('Blurred');
  }

  render() {
    const {placeholder} = this.props
    const {text} = this.state

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="white"
        selectionColor='#e7d629'
        underlineColorAndroid='transparent'
        maxLength={100}
        clearTextOnFocus={true}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    backgroundColor: '#526373',
    color: 'white',
    fontSize: 15,
    borderRadius: 3
  },
})
