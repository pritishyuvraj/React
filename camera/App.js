/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { RNCamera } from "react-native-camera";
import RNFetchBlob from "react-native-fetch-blob";
import { PermissionsAndroid } from "react-native";
import CameraRollApp from "./android_camera_roll/CameraRollApp";
import { createStackNavigator, createAppContainer } from "react-navigation";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu pritish"
});

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text>Waiting</Text>
  </View>
);

type Props = {};

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      curTime: new Date().toLocaleString(),
      displayCameraRoll: false
    };
  }

  async componentDidMount() {
    console.log("Component did mounted");
    await this.requestWritePermission();
    console.log("Successfully asked for permission");
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  async requestWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "require permission for writing",
          message: "Please grant permission for writing"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use Camera");
      } else {
        console.log("You can't use Camera");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    if (this.state.displayCameraRoll) {
      // return (
      //   <View style={styles.container}>
      //     <Text> Hello World </Text>
      //   </View>
      // );
      return <CameraRollApp />;
    }
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use Camera"}
          permissionDialogMessage={"We need your permission to use your camera"}
        >
          {({ camera, status }) => {
            if (status !== "READY") return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Photos");
                  }}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> Camera Roll </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  changeToCameraRoll() {
    this.setState({ displayCameraRoll: !this.state.displayCameraRoll });
    console.log("Changing to camera Roll", this.state.displayCameraRoll);
  }

  convertTime(curTime) {
    var modifiedTime = "IMG_";
    for (var i = 0; i < curTime.length - 3; i++) {
      if (curTime[i] === "/" || curTime[i] === "," || curTime[i] === ":") {
        // do Nothing
      } else if (curTime[i] === " ") {
        modifiedTime += "_";
      } else {
        modifiedTime += curTime[i];
      }
    }
    return modifiedTime;
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    var path_to_save =
      RNFetchBlob.fs.dirs.DCIMDir +
      "/Camera/" +
      this.convertTime(this.state.curTime) +
      ".jpg";
    console.log(data.uri);
    console.log("Write file at -> ", path_to_save);
    RNFetchBlob.fs.writeFile(path_to_save, data.uri, "uri").then(() => {
      console.log("Wrote!!!!");
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

export default App;
