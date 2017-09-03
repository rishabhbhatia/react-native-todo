import React, { Component } from 'react'
import { Animated, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'

export default class DateItem extends React.PureComponent {

  componentWillMount() {
    const {todoDate} = this.props;
    const {day, date, month} = todoDate;

    if(date%2 == 0) {
      this.setState({
        currentColor: '#1B2127'
      });
    }else {
      this.setState({
        currentColor: '#313842'
      });
    }
  }

  onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    const {todoDate} = this.props;
    const {day, date, month} = todoDate;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.container, {backgroundColor: this.state.currentColor}]} >
          <Text style={styles.day}>{day.toUpperCase()}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.month}>{month.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 65,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    color: 'white',
    fontSize: 11,
  },
  date: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500'
  },
  month: {
    color: 'white',
    fontSize: 10,
  }
})
