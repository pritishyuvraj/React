import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
// import { Platform, StatusBar, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default class Root extends React.Component{
  state = {
    isLoading: false
  };

  render(){
    console.log("Hello World")
    return(
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  backgroundText: {
    fontWeight: 'bold',
    fontSize: 40,
    flex: 3,
    textAlign: 'center',
    textAlignVertical: "bottom",
    color: 'white',
    paddingVertical: 60
  }
});
