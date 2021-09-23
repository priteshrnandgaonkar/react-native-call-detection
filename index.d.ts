declare module 'react-native-call-detection' {
  export type Event = 'Disconnected' | 'Connected' | 'Incoming' | 'Dialing' | 'Offhook' | 'Missed';

  export type CallDetectorManagerCallback = (event: Event, phoneNumber: string) => void;

  export type PermissionDeniedCallback = () => void;

  export interface PermissionMessage {
    title: string;
    message: string;
  }

  export default class CallDetectorManager {
    constructor(callback: CallDetectorManagerCallback, readPhoneNumberAndroid?: boolean, permissionDeniedCallback?: PermissionDeniedCallback, permissionMessage?: PermissionMessage);

    dispose: () => void;
  }
}
