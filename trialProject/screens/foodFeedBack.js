import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Tts from 'react-native-tts';

export default class foodFeedBack extends React.Component{
  constructor(props){
    super(props);
    Tts.setDefaultLanguage('en-US')
    this.onShortPress = this.onShortPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
  }
  state = {
    isLoading: true,
    dataSource: null
  }

  componentDidMount(){
    return fetch('https://0d0b80a0.ngrok.io/getFooodHistory')
      .then ((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          isLoading: false
        })
        console.log("response Json", responseJson)
      })
      .catch((error) => {
        console.error("Error detecting fetching data", error)
      })
  }
  onShortPress(){
    console.log("User pressed for shorter time");
  }

  onLongPress(summary){
    console.log("User pressed for longer Time");
    Tts.speak(summary)
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1 }}>
         <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
       </View>
      )
    }else{
      return(
        <View>
          {
            this.state.dataSource.map( (description, index) => (
              <ListItem
                key = {index}
                title = {description.day}
                subtitle = {description.summary}
                onPress = {() => this.onShortPress()}
                onLongPress = {() => this.onLongPress(description.summary)}
                />
            ))
          }
        </View>
      )
    }

  }
}
