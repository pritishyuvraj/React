import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    isRecording: false,
    recordingPresmission: false,
    recording: new Expo.Audio.Recording()
  }

  onPress = () => {
    console.log("initial onPress", this.state.isRecording)
    this.setState({
      isRecording: !this.state.isRecording
    }, function(){
      console.log("now onPress", this.state.isRecording)
      if(this.state.isRecording){
        (async() => {
          await this.recordAudio(true)
        })()
      }
      else{
        (async() => {
          await this.recordAudio(false)
        })()
      }
    })
  }

  async playAudio(){
    soundObject = new Expo.Audio.Sound()
    try{
      await soundObject.loadAsync(require('../assets/sound/california.mp3'))
      await soundObject.playAsync()
      console.log("palying audio")
    } catch(error){
      console.log("Error is ", error)
    }
    // Call this function using
    // (async () => {
    //   await this.playAudio()
    // })()
  }

  async recordAudio(record){
    if(record === true){
      console.log("recording method starts")
      try{
        await this.state.recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        await this.state.recording.startAsync()
        console.log("Audio recording started")
      } catch(error){
        console.log("Error while starting audio recording", error)
      }
    }
    else{
      try{
        await this.state.recording.stopAndUnloadAsync()
        console.log("Recording stopped successfully")
        if(this.state.recording){
          const fileUrl = this.state.recording.getURI()
          this.state.recording.setOnRecordingStatusUpdate(null)
          this.setState({
            recording: new Expo.Audio.Recording()
          })
          console.log("file URL -> ", fileUrl)
        }
      } catch(error){
        console.log("Error while stopping audio recording", error)
      }
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
        >
          <Text
            style={styles.recordingText}>
            {this.state.isRecording ? "Stop Recording": "Start Recording"}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#800000',
    borderRadius: 200,
    borderWidth:1,
    width: 200,
    height: 200
  },
  recordingText: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    paddingVertical: 50,
    textAlign: 'center'
  }
});