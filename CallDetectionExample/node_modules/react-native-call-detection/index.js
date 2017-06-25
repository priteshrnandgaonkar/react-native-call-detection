/*
* @providesModule react-native-call-detection
*/
import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
const BatchedBridge = require('react-native/Libraries/BatchedBridge/BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

var CallStateUpdateActionModule = require('./CallStateUpdateActionModule')
BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallStateUpdateActionModule)

class CallDetectorManager {

    subscription;
    callback
    constructor(callback) {
        this.callback = callback
        if (Platform.OS === 'ios') {
            NativeCallDetector && NativeCallDetector.startListener()
            this.subscription = new NativeEventEmitter(NativeCallDetector)
            this.subscription.addListener('PhoneCallStateUpdate', callback);
        }
        else {
            NativeCallDetectorAndroid && NativeCallDetectorAndroid.startListener()
            CallStateUpdateActionModule.callback = callback
        }
    }

    dispose() {
    	NativeCallDetector && NativeCallDetector.stopListener()
    	NativeCallDetectorAndroid && NativeCallDetectorAndroid.stopListener()
        CallStateUpdateActionModule.callback = undefined
      if(this.subscription) {
          this.subscription.removeAllListeners('PhoneCallStateUpdate');
          this.subscription = undefined
      }
    }
}

export default module.exports = CallDetectorManager;