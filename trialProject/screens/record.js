/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class record extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      audioCount: 0,
      isRecording: false,
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  testedcomponentDidMount(){
    // return fetch('https://facebook.github.io/react-native/movies.json')
    console.log("starting to extract info")
    return fetch('https://75387e5e.ngrok.io/pritishyuvraj')
     .then((response) => response.json())
     .then((responseJson) => {

       this.setState({
         isLoading: false,
         dataSource: responseJson,
       }, function(){
         console.log("Reaching here", responseJson)
       });

     })
     .catch((error) =>{
       console.error("Error detected", error);
     });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.audioCount !== this.state.audioCount){
      console.log("starting to extract info", nextState.audioCount, this.state.audioCount, this.state.results);
      stringToUrl = encodeURIComponent(this.state.results[0])
      url = 'https://cd661cb0.ngrok.io/' + stringToUrl;
      // return fetch('https://0d0b80a0.ngrok.io/pritishyuvraj')
      return fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {

         this.setState({
           isLoading: false,
           dataSource: responseJson,
         }, function(){
           console.log("Reaching here", responseJson)
         });

       })
       .catch((error) =>{
         console.error("Error detected", error);
       });
    }
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    // this.setState({
    //   recognized: '√',
    // }, (async () => {
    //   await this._sendVoiceData()
    // })());
    this.setState({
      recognized: '√',
    }, () => {
      console.log("Audio recorded");
      this.setState({
        audioCount: this.state.audioCount + 1,
      })
    });


    console.log("speech has been recognized");
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    }, () => {
      console.log("Audio recorded");
      this.setState({
        audioCount: this.state.audioCount + 1,
      })
    });
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      isRecording: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    this.setState({
      isRecording: false
    })
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  }

  async _getMoviesFromApi() {
  try {
    let response = await fetch(
      'https://facebook.github.io/react-native/movies.json'
    );
    let responseJson = await response.json();
    console.log("response -> ", responseJson)
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
  }

  async _sendVoiceData() {
    textToSend = this.state.recognized;
    console.log("text to send", textToSend);
    try {
      let response = await fetch(
        'http://10.0.2.2:5000/pritishYUvraj'
      );
      // let responseJson = await response.json();
      // console.log("response -> ", responseJson);
      // return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }

  recordButton() {
    if(!this.state.isRecording){
      return(
        <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
          <Image
            style={styles.button}
            source={require('./recording_start.jpg')}
          />
        </TouchableHighlight>
      )
    } else{
      return(
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
        <Image
          style={styles.button}
          source={require('./recording_stop.jpg')}
        />
        </TouchableHighlight>
      )

    }
  }

  render(){
    return(
      <View style={styles.container}>
      <Text
        style={styles.stat}>
        Results
      </Text>
      { this.recordButton() }
      <TouchableHighlight onPress={this._cancelRecognizing.bind(this)}>
        <Text
          style={styles.action}>
          Cancel
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
        <Text
          style={styles.action}>
          Destroy
        </Text>
      </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 205,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
