package com.pritesh.calldetection;

import com.facebook.react.bridge.JavaScriptModule;

public interface CallStateUpdateActionModule extends JavaScriptModule {
    void callStateUpdated(String state, String phoneNumber);
}
