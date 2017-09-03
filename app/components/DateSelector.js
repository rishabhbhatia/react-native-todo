import React, { Component } from 'react';
import { Animated, View, FlatList, StyleSheet } from 'react-native';

import DateItem from './DateItem';

export default class DateSelector extends Component {

  onPressItem = (index) => {
    // fake a new date selected state
    // set isLoading state true, show infite loader, after timeout of 2sec reset isLoading
    console.log('Date selected '+index);
  };

  render() {
    const {dates} = this.props;

    return (
      <FlatList
        data={dates}
        renderItem={({item, index}) => <DateItem todoDate={item} index={index} onPressItem={this.onPressItem} />}
        keyExtractor={(item) => item.id}
        onPressItem={this.onPressItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    )
  }
}

const styles = StyleSheet.create({

})
