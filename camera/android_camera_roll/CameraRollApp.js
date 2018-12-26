import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  CameraRoll,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";

class CameraRollApp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
    };
  }

  async componentDidMount() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos"
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        console.log("Error loading Images");
      });
  }
  render() {
    if (this.state.photos === null) {
      console.log("Its loading....");
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    console.log("Already loaded");
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default CameraRollApp;
