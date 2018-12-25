import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
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
    fetchDetails: null,
    refreshing: false,
  }

  componentDidMount(){
    return fetch('https://cd661cb0.ngrok.io/getFooodHistory')
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
    if(nextState.refreshing === true && this.state.refreshing !== nextState.refreshing){
      console.log("catching this state");
      return fetch('https://cd661cb0.ngrok.io/getFooodHistory')
        .then ((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson,
            refreshing: false
          })
          // console.log("response Json", responseJson)
        })
        .catch((error) => {
          console.error("Error detecting fetching data", error)
        })
    }
  }

  onShortPress(description){
    // console.log("User pressed for shorter time", description.day, description[description.day.toLowerCase()]);
    this.setState({
      showingFoodDetails: true,
      fetchDetails: description[description.day.toLowerCase()]
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

  _onRefresh = () => {
    this.setState({refreshing: true}, () =>{
      return fetch('https://cd661cb0.ngrok.io/getFooodHistory')
        .then ((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson,
            refreshing: false
          })
          // console.log("response Json", responseJson)
        })
        .catch((error) => {
          console.error("Error detecting fetching data", error)
        });
    });
    this.setState({refreshing: false})
    console.log("started to refresh");
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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            >
          {
            this.state.dataSource.map( (description, index) => (
              <ListItem
                key = {index}
                title = {description.day}
                subtitle = {
                  description.summary
                }
                rightTitle = "Cal"
                onPress = {() => this.onShortPress(description)}
                onLongPress = {() => this.onLongPress(description.summary)}
                />
            ))
          }
          </ScrollView>
        </View>
      )
    }

  }
}
