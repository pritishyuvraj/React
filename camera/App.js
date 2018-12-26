/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import { PermissionsAndroid } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu pritish',
});

const PendingView = () => (
  <View
    style={{
      flex:1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems:'center'
    }}
  >
    <Text>Waiting</Text>
    </View>
);

type Props = {};



async function requestWritePermission(){
  try{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Require permission to write',
        'message': 'Please grant permission for writing'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED){
      console.log("You can use write");
    }
    else{
      console.log("YOu can't write");
    }
  }
  catch(err){
    console.warn(err);
  }
}

export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      curTime: new Date().toLocaleString()
    };
  }
  async componentDidMount(){
    console.log("Component did mounted");
    await this.requestCameraPermission();
    console.log("Successfully asked for permission");


  }
  componentWillMount(){
    setInterval( ()=> {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000);
  }

  async requestCameraPermission(){
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'require permission for writing',
          'message': 'Please grant permission for writing'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED){
        console.log("You can use Camera");
      }
      else{
        console.log("You can't use Camera");
      }
    }
    catch(err){
      console.warn(err);
    }
  }

  render1() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use Camera'}
          permissionDialogMessage={'We need your permission to use your camera'}
        >
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex:0, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=> this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  convertTime(curTime) {
   var modifiedTime = 'IMG_';
   for(var i=0; i<curTime.length-3; i++){
     if(curTime[i] === '/' || curTime[i] === ',' || curTime[i] === ':'){
       // do Nothing
     }
     else if(curTime[i] === ' '){
       modifiedTime += '_'
     }
     else{
       modifiedTime += curTime[i];
     }
   }
   return modifiedTime;
  }

  takePicture = async function(camera){
    const options = { quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    path_to_save = RNFetchBlob.fs.dirs.DCIMDir + '/Camera/' + this.convertTime(this.state.curTime)  +'.jpg'
    console.log(data.uri);
    console.log("Write file at -> ", path_to_save);
    RNFetchBlob.fs.writeFile(path_to_save, data.uri, 'uri').then(
      () => {
        console.log("Wrote!!!!");
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
