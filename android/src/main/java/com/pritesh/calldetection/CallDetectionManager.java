package com.pritesh.calldetection;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import android.app.Application;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;


public class CallDetectionManager implements ReactPackage {

    private Application applicationInstance;

    public CallDetectionManager(Application applicationInstance) {
        super();
        this.applicationInstance = applicationInstance;
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        CallDetectionManagerModule callDetectionModule = new CallDetectionManagerModule(reactContext);
        applicationInstance.registerActivityLifecycleCallbacks(callDetectionModule);
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
