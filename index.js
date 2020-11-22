/*
* @providesModule react-native-call-detection
*/
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid
} from 'react-native'
export const permissionDenied = 'PERMISSION DENIED'

const BatchedBridge = require('react-native/Libraries/BatchedBridge/BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager
const NativeCallDetectorAndroid = NativeModules.CallDetectionManagerAndroid

var CallStateUpdateActionModule = require('./CallStateUpdateActionModule')
BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallStateUpdateActionModule)

// https://stackoverflow.com/questions/13154445/how-to-get-phone-number-from-an-incoming-call : Amjad Alwareh's answer.
const requestPermissionsAndroid = (permissionMessage) => {
  const requiredPermission = Platform.constants.Release >= 9
    ? PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
    : PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
  return PermissionsAndroid.check(requiredPermission)
    .then((gotPermission) => gotPermission
      ? true
      : PermissionsAndroid.request(requiredPermission, permissionMessage)
        .then((result) => result === PermissionsAndroid.RESULTS.GRANTED)
    )
}

class CallDetectorManager {

  subscription;
  callback
  constructor(callback, readPhoneNumberAndroid = false, permissionDeniedCallback = () => { }, permissionMessage = {
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
      if (NativeCallDetectorAndroid) {
        if (readPhoneNumberAndroid) {

          requestPermissionsAndroid(permissionMessage)
            .then(([permissionGrantedPhoneState, permissionGrantedCallLog]) => {
              const releaseNumber = Platform.constants.Release

              // for all android version: need read phone state
              // for version >= 9: also need read call log
              if (!permissionGrantedPhoneState || (!permissionGrantedCallLog && releaseNumber >= 9 )) {
                permissionDeniedCallback(permissionDenied)
              }
            })
            .catch(permissionDeniedCallback)

        }
        NativeCallDetectorAndroid.startListener();
      }
      CallStateUpdateActionModule.callback = callback
    }
  }

  dispose() {
    NativeCallDetector && NativeCallDetector.stopListener()
    NativeCallDetectorAndroid && NativeCallDetectorAndroid.stopListener()
    CallStateUpdateActionModule.callback = undefined
    if (this.subscription) {
      this.subscription.removeAllListeners('PhoneCallStateUpdate');
      this.subscription = undefined
    }
  }
}
export default module.exports = CallDetectorManager;
