import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = (title) => {

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#313842',
    padding: 15,
    elevation: 7,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
})

export default Title;
