## React Native Call Detection 🎉 🎊
[![npm version](https://badge.fury.io/js/react-native-call-detection.svg)](https://badge.fury.io/js/react-native-call-detection)

This package helps to detect different call states like `Incoming`, `Disconnected`, `Dialing` and `Connected` for iOS. For android, this package will give following states, `Offhook`, `Incoming`, `Disconnected` and `Missed`. In the case of `Incoming` for android, the package will also provide with the incoming phone number.

## Installation

Add the package to your react-native project in the following way

```shell
yarn add react-native-call-detection

```

Link the current package to your react native project

```shell
react-native link react-native-call-detection

```

### For Android:-
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
There are different hooks that you may get depending on the platform. Since for android you could also request the package to provide you with phone number of the caller, you will have to provide the necessary request message and the corresponding error callback. The package will request for `READ_PHONE_STATE` permission in android.

Its really easy to setup the package. Have a look at the following code snippet

``` javascript
import CallDetectorManager from 'react-native-call-detection'

startListenerTapped() {
	this.callDetector = new CallDetectorManager((event)=> {
	// For iOS event will be either "Connected",
	// "Disconnected","Dialing" and "Incoming"
	
	// For Android event will be either "Offhook",
	// "Disconnected", "Incoming" or "Missed"
	

	if (event === 'Disconnected') {
	// Do something call got disconnected
	} 
	else if (event === 'Connected') {
	// Do something call got connected
	// This clause will only be executed for iOS
	} 
	else if (event === 'Incoming') {
	// Do something call got incoming
	}
	else if (event === 'Dialing') {
	// Do something call got dialing
	// This clause will only be executed for iOS
	} 
	else if (event === 'Offhook') {
	//Device call state: Off-hook. 
	// At least one call exists that is dialing,
	// active, or on hold, 
	// and no calls are ringing or waiting.
	// This clause will only be executed for Android
	}
	else if (event === 'Missed') {
    	// Do something call got missed
    	// This clause will only be executed for Android
    }
},
false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
()=>{}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
{
title: 'Phone State Permission',
message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
} // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
)
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

### Caveat 
Since For android, there is no native support to detect call being disconnected, the callback with "Disconnected" event will be called only when the app comes in foreground.

### How to run an example

1. Install `node` and `watchman`

	```
	brew install node
	brew install watchman
	 
	```

2. `yarn`

    Install `yarn` from `npm`.

        npm i -g yarn

3. Xcode

    Install it from the App Store.

4. React Native Debugger

    This is an electron app that bundles react devtools, redux devtools and chrome devtools configured for use with react-native.

        brew cask install react-native-debugger
5. Once you have done all the above steps, navigate to `CallDetectionExample` folder and run `yarn` or `npm install`, it will fetch all the dependencies in the `node_modules` folder.

6. Run the packager
	`npm start` 

7. Update the mobile number of your friend in [`HomeComponent.js`](CallDetectionExample/src/HomeComponent.js)


	```javascript
	 callFriendTapped() {
	 // Add the telephone number
    	Linking.openURL('tel:5555555555')
      .catch(err => {
        console.log(err)
      });
  	 }
  	
	```

7. To run the example on iOS from terminal type
	`react-native run-ios` (This will open the simulator, since simulator doesnt have the support for calling I will advice you to connect your iOS device and the follow the below procedure for running the app through xcode)
	
	or you can also run the app from xcode, for that, open `/CallDectionExample/ios/CallDetectionExample.xcodeproj` in xcode and run on the device.
	
8. To run the example on android, connect any android device to your mac then follow the below steps
	1. Navigate to `android` folder(./CallDectionExample/android/) folder and then run `adb reverse tcp:8081 tcp:8081`
	2. Navigate back to example directory(CallDectionExample) and then run
	`react-native run-android`
	
For any problems and doubt raise an issue.	
