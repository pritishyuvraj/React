import React from 'react';
import { View, Text } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FoodDescription extends React.Component{
  constructor(props){
    super(props);

  }

  state = {
    isLoading: true,
    breakfast: 'Skipped!',
    lunch: 'Skipped!',
    dinner: 'Skipped!'
  }

  componentDidMount(){
      // this.props.foodDetails
      console.log("component did mount", this.props.foodDetails.breakfast.length);

      if (this.props.foodDetails.breakfast.length > 0){
          var bf = '';
          var bf_list = this.props.foodDetails.breakfast;
          for(var i = 0; i < bf_list.length; i++){
            console.log("see this -> ", bf_list[i])
            bf += bf_list[i]
            if (i !== bf_list.length - 1){
              bf += ', ';
            }
          }
          this.setState({
            breakfast: bf
          }, () => console.log("lunch is -> ", this.state.breakfast)
        );
      }

      if (this.props.foodDetails.lunch.length > 0){
          var bf = '';
          var bf_list = this.props.foodDetails.lunch;
          for(var i = 0; i < bf_list.length; i++){
            console.log("see this -> ", bf_list[i])
            bf += bf_list[i];
            if (i !== bf_list.length - 1){
              bf += ', ';
            }
          }
          this.setState({
            lunch: bf
          }, () => console.log("lunch is -> ", this.state.lunch)
        );
      }

      if (this.props.foodDetails.dinner.length > 0){
          var bf = '';
          var bf_list = this.props.foodDetails.dinner;
          for(var i = 0; i < bf_list.length; i++){
            console.log("see this -> ", bf_list[i])
            bf += bf_list[i];
            if (i !== bf_list.length - 1){
              bf += ', ';
            }
          }
          this.setState({
            dinner: bf
          }, () => console.log("lunch is -> ", this.state.dinner)
        );
      }

  }

  render(){
    // console.log("values from parent is -> ", this.props.name, this.props.foodDetails, this.props.closeView)

    return(
      <View>
        <ListItem
          title = {this.state.breakfast}
          rightTitle = "Breakfast"
          avatar={
            this.state.breakfast === 'Skipped!'?
            {
              uri: 'https://cdn3.vectorstock.com/i/1000x1000/06/62/a-red-icon-with-an-exclamation-point-vector-13730662.jpg',
            }:
            {
                uri: 'https://image.shutterstock.com/image-vector/flat-round-check-mark-green-260nw-652023034.jpg',
              }
          }
          />
        <ListItem
          title = {this.state.lunch}
          rightTitle = "Lunch"
          avatar={
            this.state.lunch === 'Skipped!'?
            {
              uri: 'https://cdn3.vectorstock.com/i/1000x1000/06/62/a-red-icon-with-an-exclamation-point-vector-13730662.jpg',
            }:
            {
                uri: 'https://image.shutterstock.com/image-vector/flat-round-check-mark-green-260nw-652023034.jpg',
              }
          }
          />
        <ListItem
          title = {this.state.dinner}
          rightTitle = "Dinner"
          avatar={
            this.state.lunch === 'Skipped!'?
            {
              uri: 'https://cdn3.vectorstock.com/i/1000x1000/06/62/a-red-icon-with-an-exclamation-point-vector-13730662.jpg',
            }:
            {
                uri: 'https://image.shutterstock.com/image-vector/flat-round-check-mark-green-260nw-652023034.jpg',
              }
          }
          />
        <Button
          title="Back"
          onPress = {() => this.props.closeView()}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
          }}
        containerStyle={{ marginTop: 20 }}
        />
      </View>
    )
  }
}
