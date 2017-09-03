import React from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';

import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './app/navigation/AppNavigator';


class App extends React.Component {

  render() {

    return (
      <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <AppNavigator navigation={addNavigationHelpers({
         dispatch: this.props.dispatch,
         state: this.props.nav,
        })} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(App)
