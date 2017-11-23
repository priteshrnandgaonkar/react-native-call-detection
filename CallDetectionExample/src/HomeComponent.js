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
  ListView
} from 'react-native';

var callDetector = undefined

import CallDetectorManager from 'react-native-call-detection'

export default class HomeComponent extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {callStates : [], ds: ds} //call states
    this.startListenerTapped = this.startListenerTapped.bind(this);
  }

  startListenerTapped() {
    callDetector = new CallDetectorManager((event, number) => {
        var updatedCallStates = this.state.callStates
        updatedCallStates.push(event + ' - ' + number)
        var previousDS = this.state.ds
        this.setState({ callStates:  updatedCallStates, ds: previousDS.cloneWithRows(updatedCallStates)});
      },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      ()=>{}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
      } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    )
  }

  callFriendTapped() {
    Linking.openURL('tel:5555555555')
      .catch(err => {
        console.log(err)
      });
  }

  stopListenerTapped() {
    callDetector && callDetector.dispose();
  }

  render() {
    console.log(this.state.callStates)
    return (
      <View style={styles.container}>
        <Button
          onPress={this.startListenerTapped}
          title="Start Listener"
          color="#841584"
          style = {styles.bottomMargin}
        />

        <Button
          onPress={this.callFriendTapped}
          title="Call your friend"
          color="#341584"
          style = {styles.bottomMargin}
        />
        <Button
          onPress={this.stopListenerTapped}
          title="Stop Listener"
          color="#841584"
          style = {styles.bottomMargin}
        />

        <Text style = {styles.text}>
          Call State Logs
        </Text>

        <ListView
          dataSource={this.state.ds}
          renderRow={(rowData) => <Text style = {styles.callLogs}>{rowData}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomMargin: {
    marginBottom: 10
  },
  text: {
    marginTop: 30,
    textAlign:'center',
    fontSize: 20,
    color: '#341584'
  },
  callLogs: {
    textAlign:'center',
    fontSize: 15,
    color: '#333333',
    marginBottom: 5
  }
});
