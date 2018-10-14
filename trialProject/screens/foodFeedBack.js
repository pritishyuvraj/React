import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Tts from 'react-native-tts';
import FoodDescription from './FoodDescription'

export default class foodFeedBack extends React.Component{
  constructor(props){
    super(props);
    Tts.setDefaultLanguage('en-US')
    this.onShortPress = this.onShortPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
  }
  state = {
    isLoading: true,
    dataSource: null,
    showingFoodDetails: false,
    fetchDetails: null
  }

  componentDidMount(){
    return fetch('https://75387e5e.ngrok.io/getFooodHistory')
      .then ((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          isLoading: false
        })
        // console.log("response Json", responseJson)
      })
      .catch((error) => {
        console.error("Error detecting fetching data", error)
      })
  }

  componentWillUpdate(nextState, nextProps){
    if(nextState.showingFoodDetails !== this.state.showingFoodDetails){
      console.log("Going to display food details");

    }
  }

  onShortPress(description){
    console.log("User pressed for shorter time");
    this.setState({
      showingFoodDetails: true,
      fetchDetails: description
    })
  }

  goBack(){
    console.log("being called go back")
    this.setState({showingFoodDetails: false})
  }

  onLongPress(summary){
    console.log("User pressed for longer Time");
    Tts.speak(summary)
  }
  render(){
    console.log("status of showingFoodDetails", this.state.showingFoodDetails)
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1 }}>
         <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
       </View>
      )
    }
    else if (!this.state.isLoading && this.state.showingFoodDetails) {
      return(<FoodDescription
              name={'react native rocks'}
              foodDetails = {this.state.fetchDetails}
              closeView = {() => this.goBack()} /> )
    }
    else{
      return(
        <View>
          {
            this.state.dataSource.map( (description, index) => (
              <ListItem
                key = {index}
                title = {description.day}
                subtitle = {
                  description.summary
                }
                rightTitle = "Cal"
                // subtitle = {
                //   <View>
                //       <Text>
                //         {description.meals.lunch[0]}
                //       </Text>
                //   </View>
                // }
                onPress = {() => this.onShortPress(description)}
                onLongPress = {() => this.onLongPress(description.summary)}
                />
            ))
          }
        </View>
      )
    }

  }
}
