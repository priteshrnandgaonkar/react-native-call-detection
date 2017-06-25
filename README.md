## React Native Call Detection 🎉 🎊
[![npm version](https://badge.fury.io/js/react-native-call-detection.svg)](https://badge.fury.io/js/react-native-call-detection)

This package helps to detect different call states like `Incoming`, `Disconnected`, `Dialing` and `Connected` for iOS. For android, this package will give the following states, `Offhook`, `Incoming` and `Disconnected`.

## Installation

Add the package to your react-native project in the following way

```shell
yarn add react-native-call-detection

```

Link the current package to your react native project

```shell
react-native link react-native-call-detection

```

###For Android:-
Just Verify that the following changes are present in the corresponding files

-  In `MainApplication.java`

``` diff
+ import com.pritesh.calldetection.CallDetectionManager;
	@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+     new CallDetectionManager(MainApplication.this)
      );
    }
  };
```
- In `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-call-detection'
+ project(':react-native-call-detection').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-call-detection/android')
``` 
	
- In `android/app/build.gradle`:

```diff
dependencies {
    ...
    compile "com.facebook.react:react-native:+"  // From node_modules
+   compile project(':react-native-call-detection')
}
```

## Usage
There are different hooks that you may get depending on the platform. So if

Its really easy to setup the package. Have a look at the following code snippet

``` javascript
import CallDetectorManager from 'react-native-call-detection'

startListenerTapped() {
	this.callDetector = new CallDetectorManager((event)=> {
	if (Platform.OS === 'ios') {
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
		// event will be either "Offhook", 
		// "Disconnected" and "Incoming"
		    
		if (event === 'Offhook') {
		//Device call state: Off-hook. 
		// At least one call exists that is dialing,
		// active, or on hold, 
		// and no calls are ringing or waiting.
		    
		} 
		else if (event === 'Disconnected') {
		// Do something call got Disconnected
		} 
		else if (event === 'Incoming') {
		// Do something call got Incoming
    	}	
	}
	})
}

stopListenerTapped() {
	this.callDetector && this.callDetector.dispose();
}

```

Dont forget to call `dispose` when you don't intend to use call detection, as it will avoid memory leakages.

Example project can be used to test out the package. In the example project update the `HomeComponent.js` with the phone number to call

```javascript
  callFriendTapped() {
  // Add the telephone num to call
    Linking.openURL('tel:5555555555')
      .catch(err => {
        console.log(err)
      });
  }
```

For any problems and doubt raise an issue.