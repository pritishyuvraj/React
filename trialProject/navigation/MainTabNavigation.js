import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import record from '../screens/record';
import foodFeedBack from '../screens/foodFeedBack';
import HealthStatus from '../screens/HealthStatus';
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
  Links: foodFeedBack,
});

LinkStack.navigationOptions = {
  tabBarLabel: 'FeedBack'
};

const FormStack = createStackNavigator({
  Links: HealthStatus
});

FormStack.navigationOptions = {
  title: 'Health Status'
}

export default createBottomTabNavigator({
  HomeStack,
  LinkStack,
  FormStack
});
