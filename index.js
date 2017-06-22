/**
 * @providesModule react-native-call-detection
 */
import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
const BatchedBridge = require('BatchedBridge'
BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallDetectorManager)

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

NativeCallDetector && NativeCallDetector.startListener();
NativeCallDetectorAndroid && NativeCallDetectorAndroid.startListener();

class CallDetectorManager {

    subscription;
    callback
    constructor(callback) {
        this.callback = callback
        if (Platform.OS === 'ios') {
            this.subscription = new NativeEventEmitter(NativeCallDetector)
            this.subscription.addListener('PhoneCallStateUpdate', callback);
        }
    }

    dispose() {
    	NativeCallDetector && NativeCallDetector.stopListener()
    	NativeCallDetectorAndroid && NativeCallDetectorAndroid.stopListener()
        if(this.subscription) this.subscription.remove();
    }

      callStateUpdated(state) {
        console.log('State')
        console.log(state)
        callback(state)
      }
}

export default module.exports = CallDetectorManager;
