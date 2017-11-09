/*
* @providesModule react-native-call-detection
*/
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid
} from 'react-native'
const BatchedBridge = require('react-native/Libraries/BatchedBridge/BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

var CallStateUpdateActionModule = require('./CallStateUpdateActionModule')
BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallStateUpdateActionModule)

const requestPermissionsAndroid = (permissionMessage) => {
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
    .then((gotPermission) => gotPermission
      ? true
      : PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, permissionMessage)
          .then((result) => result === PermissionsAndroid.RESULTS.GRANTED)
    )

export const PermissionDenied = 'PERMISSION DENIED'
class CallDetectorManager {

    subscription;
    callback
    constructor(callback, readPhoneNumberAndroid = false, permissionDeniedCallback = console.error, permissionMessage = {
      title: 'Phone State Permission',
      message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
    }) {
        this.callback = callback
        if (Platform.OS === 'ios') {
            NativeCallDetector && NativeCallDetector.startListener()
            this.subscription = new NativeEventEmitter(NativeCallDetector)
            this.subscription.addListener('PhoneCallStateUpdate', callback);
        }
        else {
            if(NativeCallDetectorAndroid) {
              if(readPhoneNumberAndroid) {
                requestPermissionsAndroid(permissionMessage)
                  .then((permissionGranted) => permissionGranted ? NativeCallDetectorAndroid.startListener() : permissionDeniedCallback(PermissionDenied))
                  .catch(permissionDeniedCallback)
              } else {
                NativeCallDetectorAndroid.startListener()
              }
            }
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
