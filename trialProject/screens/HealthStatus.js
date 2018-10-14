import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export default class HealthStatus extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    name: 'Enter your Name....',
    Email: 'Enter your email-id',
    chlorestrol: '',
    diabetes: '',
    height_ft: '',
    height_in: '',
  }

  handleNameChange(e){
    console.log("see the change", e);
  }

  render(){
    return(
      <View style={styles.container}>
      <Text>{"\n"}Your Health Form: {"\n\n"}</Text>
      <TextInput
         style={{height: 40, borderColor: 'gray', borderWidth: 1, alignSelf: 'stretch' }}
         onChangeText={(name) => this.setState({name})}
         value={this.state.name}
      />
      <Text>{"\n"}</Text>
      <TextInput
         style={{height: 40, borderColor: 'gray', borderWidth: 1, alignSelf: 'stretch' }}
         onChangeText={(Email) => this.setState({Email})}
         value={this.state.Email}
      />
      <Text>{"\n"}</Text>
      <Button
        title="Submit"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: 300,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
