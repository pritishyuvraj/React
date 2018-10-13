import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import record from '../screens/record';
import TabBarIcon from '../components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: record,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Recording',
  TabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused = {focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinkStack = createStackNavigator({
  Links: record,
});

LinkStack.navigationOptions = {
  tabBarLabel: 'FeedBack'
};
export default createBottomTabNavigator({
  HomeStack,
  LinkStack
});
