import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

import AppNavigator from './app/navigation/AppNavigator';

import todoStore from './app/redux/store/TodoStore'

import Title from './app/components/Title';
import Input from './app/components/Input';
import List from './app/components/List';

class App extends React.Component {

render() {

    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(App)
