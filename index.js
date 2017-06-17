import { NativeModules } from 'react-native'
module.exports = NativeModules.CallDetectionManager

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
