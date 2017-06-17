'use strict';

import { NativeModules, NativeAppEventEmitter } from 'react-native';
import { NativeAppEventEmitter } from 'react-native';

const NativeCallDetector = NativeModules.CallDetectionManager;
module.exports = NativeCallDetector
// NativeCallDetector.startListener();

// class CallDetector {
//     static listeners = {};

//     name;
//     subscription;

//     constructor(name, callback) {
//         if(CallDetector.listeners[name]) CallDetector.listeners[name].dispose();
//         CallDetector.listeners[name] = this;
//         this.subscription = NativeAppEventEmitter.addListener('PhoneCallUpdate', callback);
//     }

//     dispose() {
//         if(this.subscription) this.subscription.remove();
//         CallDetector.stopListener()
//         delete CallDetector.listeners[this.name];
//     }
// }

// export default module.exports = CallDetector;
