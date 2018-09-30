import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {textCal: ''}
  }

  onPressButton = (incoming) => {
    this.setState({
      textCal: this.state.textCal + incoming
    })
  }

  onPressClear = () => {
    this.setState({
      textCal: ''
    })
  }

  onPressAdd = (symbol) => {
    this.setState({
      textCal: this.state.textCal + ' '+ symbol + ' '
    })
  }

  onPressEvaluate = () => {
    const evaluateText = this.state.textCal.split(' ')
    var temp1 = null, temp2 = null, op = null
    if(this.state.textCal !== ''){
      for(var i = 0; i < evaluateText.length; i++){
        if(evaluateText[i] !== '+' &&
            evaluateText[i] !== '-' &&
            evaluateText[i] !== '/' &&
          evaluateText[i] !== '*'){
            if(!temp1){
              temp1 = parseInt(evaluateText[i], 10)
            }
            else{
              temp2 = parseInt(evaluateText[i], 10)
              if(op === '+'){
                temp1 = temp1 + temp2
              }
              else if (op === '-') {
                temp1 = temp1 - temp2
              }
              else if (op === '/') {
                temp1 = temp1 / temp2
              }
              else if (op === '*') {
                temp1 = temp1 * temp2
              }
            }
          }
        else{
          op = evaluateText[i]
        }
      }
    }
    this.setState({
      textCal: temp1
    })
  }

  render() {
    return (
      <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View style = {{height: 100}} />
        <TextInput
          style = {{alignSelf: "stretch", height: 100, backgroundColor: 'white', fontSize: 40}}
          keyboardType = 'numeric'
          textAlign = 'right'
          clearButtonMode = 'always'
          placeholder = "Enter a number" >
            {this.state.textCal === '' ? '': this.state.textCal}
          </TextInput>
        <View style = {{flex: 2, flexDirection: 'row'}} >
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress= {() => {this.onPressAdd('+')}}
            >
              <Text style = {styles.textOperations}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress= {() => {this.onPressAdd('/')}}
            >
              <Text style = {styles.textOperations}> / </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress= {() => {this.onPressAdd('*')}}
            >
              <Text style = {styles.textOperations}> * </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress= {() => {this.onPressAdd('-')}}
            >
              <Text style = {styles.textOperations}> - </Text>
            </TouchableOpacity>
        </View>

        <View style = {{flex: 3, flexDirection: 'row'}} >
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('7')} }
            >
              <Text style = {styles.textOperations}> 7 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('8')} }
            >
              <Text style = {styles.textOperations}> 8 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('9')} }
            >
              <Text style = {styles.textOperations}> 9 </Text>
            </TouchableOpacity>
        </View>

        <View style = {{flex: 3, flexDirection: 'row'}} >
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('4')} }
            >
              <Text style = {styles.textOperations}> 4 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('5')} }
            >
              <Text style = {styles.textOperations}> 5 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('6')} }
            >
              <Text style = {styles.textOperations}> 6 </Text>
            </TouchableOpacity>
        </View>

        <View style = {{flex: 3, flexDirection: 'row'}} >
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('1')} }
            >
              <Text style = {styles.textOperations}> 1 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('2')} }
            >
              <Text style = {styles.textOperations}> 2 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = {() => {this.onPressButton('3')} }
            >
              <Text style = {styles.textOperations}> 3 </Text>
            </TouchableOpacity>
        </View>

        <View style = {{flex: 2, flexDirection: 'row'}} >
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = { () => {this.onPressEvaluate()}}
            >
              <Text style = {styles.textOperations}> = </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperations}
              onPress = { () => {this.onPressClear()}}
            >
              <Text style = {styles.textOperations}> Clear </Text>
            </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOperations:{
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    // height: 100
  },
  textOperations: {
    fontSize: 40,
  }
});
