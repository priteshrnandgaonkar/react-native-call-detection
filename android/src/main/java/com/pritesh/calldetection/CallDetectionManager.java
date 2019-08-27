package com.pritesh.calldetection;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;


public class CallDetectionManager implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        CallDetectionManagerModule callDetectionModule = new CallDetectionManagerModule(reactContext);
        modules.add(callDetectionModule);

        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Arrays.<Class<? extends JavaScriptModule>>asList(
                CallStateUpdateActionModule.class
        );
    }

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
