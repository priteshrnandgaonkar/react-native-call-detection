package com.pritesh.calldetection;

import android.telephony.PhoneStateListener;

public class CallDetectionPhoneStateListener extends PhoneStateListener {

    private PhoneCallStateUpdate callStatCallBack;

    public CallDetectionPhoneStateListener(PhoneCallStateUpdate callStatCallBack) {
        super();
        this.callStatCallBack = callStatCallBack;
    }

    @Override
    public void onCallStateChanged(int state, String incomingNumber) {
        this.callStatCallBack.phoneCallStateUpdated(state, incomingNumber);
    }

    interface PhoneCallStateUpdate {
        void phoneCallStateUpdated(int state, String incomingNumber);
    }

}
