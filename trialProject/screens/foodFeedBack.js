import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

export default class foodFeedBack extends React.Component{
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
          <Text> Reached feedback page</Text>
        </View>
      )
    }

  }
}
