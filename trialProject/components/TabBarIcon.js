import React from 'react';
import { Image } from 'react-native';

// import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render(){
    return(
      <Image
        source={require('./record.png')}
      />
    );
  }
}
