/*
* @providesModule react-native-call-detection
*/
import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
const BatchedBridge = require('BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

NativeCallDetector && NativeCallDetector.startListener()
NativeCallDetectorAndroid && NativeCallDetectorAndroid.startListener()

var CallStateUpdateActionModule = require('./CallStateUpdateActionModule')
BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallStateUpdateActionModule)

class CallDetectorManager {

    subscription;
    callback
    constructor(callback) {
        debugger
        this.callback = callback
        if (Platform.OS === 'ios') {
            this.subscription = new NativeEventEmitter(NativeCallDetector)
            this.subscription.addListener('PhoneCallStateUpdate', callback);
        }
        else {
            CallStateUpdateActionModule.callback = callback
        }
    }

    dispose() {
    	NativeCallDetector && NativeCallDetector.stopListener()
    	NativeCallDetectorAndroid && NativeCallDetectorAndroid.stopListener()
        CallStateUpdateActionModule.callback = undefined
      if(this.subscription) {
          this.subscription.remove();
          this.subscription = undefined
      }
    }

      callStateUpdated(state) {

        console.log('State')
        console.log(state)
        callback(state)
      }
}

export default module.exports = CallDetectorManager;