import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import CameraRollApp from "./android_camera_roll/CameraRollApp";
import App from "./App";

class CameraScreen extends React.Component {
  render() {
    return (
      <View>
        <Text> I am at Camera Screen </Text>
        <Button
          title="Go to the Camera Roll"
          onPress={() => {
            this.props.navigation.navigate("Photos");
          }}
        />
      </View>
    );
  }
}

class CameraRoll extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text> I am at Camera Roll </Text>
        <Button
          title="Go to Camera"
          onPress={() => this.props.navigation.navigate("Camera")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Camera: {
      screen: App,
      navigationOptions: {
        header: null
      }
    },
    Photos: {
      screen: CameraRollApp,
      navigationOptions: {
        headerTitle: "Photos"
      }
    }
  },
  {
    initialRouteName: "Camera"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class CameraApp extends React.Component {
  render() {
    return <AppContainer />;
  }
}
