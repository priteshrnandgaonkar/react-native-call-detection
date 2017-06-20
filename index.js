/**
 * @providesModule react-native-call-detection
 */
import { NativeModules, NativeAppEventEmitter } from 'react-native'
const NativeCallDetector = NativeModules.CallDetectionManager

NativeCallDetector.startListener();

class CallDetectorManager {

    subscription;

    constructor(callback) {
    	this.subscription = new NativeEventEmitter(NativeCallDetector)
        this.subscription.addListener('PhoneCallStateUpdate', callback);
    }

    dispose() {
    	NativeCallDetector.stopListener()
        if(this.subscription) this.subscription.remove();
    }
}

export default module.exports = CallDetectorManager;
