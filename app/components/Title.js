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
    borderRadius: 2,
    borderColor: '#1B2127',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
})

export default Title;
