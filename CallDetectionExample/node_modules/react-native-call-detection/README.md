## React Native Call Detection 🎉 🎊

This package helps to detect different call states like Incoming, Disconnected, Dialing and Connected for iOS. For android the work is in progress.

## Installation

Add the package to your react-native project

If your package uses yarn then
```
yarn add react-native-call-detection
```

Link the current package to your react native project in the following way

```
react-native link react-native-call-detection

```

Add CoreTelephony framework in your iOS project.

## Usage
Its really easy to setup the package. Have a look at the following code snippet

``` javascript
import CallDetectorManager from 'react-native-call-detection'

startListenerTapped() {
	this.callDetector = new CallDetectorManager((event)=> {
	if (Platform.OS === 'ios') {
		// For iOS
		// event will be either "Connected", 
		// "Disconnected","Dialing" and "Incoming"
	
		if (event === 'Disconnected') {
			// Do something call got disconnected
		} 
		else if (event === 'Connected') {
		// Do something call got connected
		} 
		else if (event === 'Incoming') {
		// Do something call got incoming
		}
		else if (event === 'Dialing') {
		// Do something call got dialing
		}
	}
	else {
		// For android work is in progress
		}
	})
}

stopListenerTapped() {
	this.callDetector && this.callDetector.dispose();
}

```

Dont forget to call `dispose` when you don't intend to use call detection, as it will avoid memory leakages.

For any problems and doubt raise an issue.