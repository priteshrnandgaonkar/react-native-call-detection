/**
 * @providesModule HomeComponent
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';

import CallDetectorManager from 'react-native-call-detection'

export default class HomeComponent extends Component {
  startListenerTapped() {
    // CallDetectionManager.addCallBlock(() => {
    //   console.log("called by ios")
    // })
    debugger
    this.callDetector = new CallDetectorManager((event)=>{
      console.log(event)
    })
  }

  callFriendTapped() {
    Linking.openURL('tel:9960995854')
      .catch(err => {
        console.log(err)
      });
  }

  stopListenerTapped() {
    this.callDetector && this.callDetector.dispose();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.startListenerTapped}
          title="Start Listener"
          color="#841584"
        />

        <Button
          onPress={this.callFriendTapped}
          title="Call your friend"
          color="#341584"
        />

        <Button
          onPress={this.stopListenerTapped}
          title="Stop Listener"
          color="#841584"
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
