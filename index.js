import { NativeModules, NativeEventEmitter, Platform } from 'react-native'
const BatchedBridge = require('BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

NativeCallDetector && NativeCallDetector.startListener()
NativeCallDetectorAndroid && NativeCallDetectorAndroid.startListener()

BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallDetectorManager)

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