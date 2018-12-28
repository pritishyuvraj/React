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
import GridView from "react-native-super-grid";

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
      groupName: "Camera",
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
      console.log("Still Loading pictures.....");
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <GridView
        itemDimension={130}
        items={this.state.photos}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer]}>
            {console.log("Image path -> ", item)}
            {console.log("to display -> ", item.node.image.uri)}
            <Image
              style={{ height: 100 }}
              source={{ uri: item.node.image.uri }}
            />
          </View>
        )}
      />
    );
  }
  render1() {
    if (this.state.photos === null) {
      console.log("Its loading....");
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    console.log("Already loaded");
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => {
            console.log("View source -> ", p.node.image.uri);
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
  },
  gridView: {
    paddingTop: 10,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    padding: 0.5,
    height: 100
  }
});

export default CameraRollApp;
