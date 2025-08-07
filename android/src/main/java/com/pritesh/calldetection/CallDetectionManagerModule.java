package com.pritesh.calldetection;
 
import android.app.Activity;
import android.app.Application;
import android.os.Build;
import android.content.Context;
import android.os.Bundle;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
// import androidx.core.content.ContextCompat.getMainExecutor;
import android.util.Log;
 
import android.Manifest;
import android.content.pm.PackageManager;
import android.telephony.TelephonyCallback;
import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
// import androidx.annotation.RequiresApi
 
import java.util.HashMap;
import java.util.Map;
 
public class CallDetectionManagerModule
extends ReactContextBaseJavaModule
implements Application.ActivityLifecycleCallbacks,
 CallDetectionPhoneStateListener.PhoneCallStateUpdate {
 
   private boolean wasAppInOffHook = false;
   private boolean wasAppInRinging = false;
   private ReactApplicationContext reactContext;
   private TelephonyManager telephonyManager;
   private CallStateUpdateActionModule jsModule = null;
   private CallDetectionPhoneStateListener callDetectionPhoneStateListener;
   private Activity activity = null;
 
     public CallDetectionManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.callStateListenerRegistered = false;
  }
 
   @Override
   public String getName() {
     return "CallDetectionManagerAndroid";
   }
 
     @ReactMethod
  public void startListener() {
    try {
      // Safely get current activity with null check
      if (activity == null) {
        activity = getCurrentActivity();
        if (activity != null) {
          Application app = activity.getApplication();
          if (app != null) {
            app.registerActivityLifecycleCallbacks(this);
          }
        }
      }

      // Initialize telephony manager
      telephonyManager = (TelephonyManager) this.reactContext.getSystemService(
        Context.TELEPHONY_SERVICE);
      
      if (telephonyManager == null) {
        return;
      }

      callDetectionPhoneStateListener = new CallDetectionPhoneStateListener(this);

      // Register for call state changes based on Android version
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        if (reactContext.checkSelfPermission(Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
          if (callStateListener != null) {
            telephonyManager.registerTelephonyCallback(ContextCompat.getMainExecutor(reactContext), callStateListener);
            callStateListenerRegistered = true;
          }
        }
      } else {
        if (callDetectionPhoneStateListener != null) {
          telephonyManager.listen(callDetectionPhoneStateListener,
            PhoneStateListener.LISTEN_CALL_STATE);
        }
      }
    } catch (Exception e) {
      // Silently handle exceptions to prevent crashes
    }
  }
 
   @RequiresApi(api = Build.VERSION_CODES.S)
   private static abstract class CallStateListener extends TelephonyCallback implements TelephonyCallback.CallStateListener {
 
     @Override
       abstract public void onCallStateChanged(int state);
 
    }
 
    private boolean callStateListenerRegistered = false;
 
 
 
   private CallStateListener callStateListener = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) ?
 
          new CallStateListener() {
 
              @Override
 
               public void onCallStateChanged(int state) {
 
                  // Handle call state change
 
                   phoneCallStateUpdated(state, null);
 
               }
 
           }
 
           : null;
 
     @ReactMethod
  public void stopListener() {
    try {
      if (telephonyManager != null) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
          if (callStateListener != null && callStateListenerRegistered) {
            telephonyManager.unregisterTelephonyCallback(callStateListener);
            callStateListenerRegistered = false;
          }
        } else {
          if (callDetectionPhoneStateListener != null) {
            telephonyManager.listen(callDetectionPhoneStateListener,
              PhoneStateListener.LISTEN_NONE);
            callDetectionPhoneStateListener = null;
          }
        }
        telephonyManager = null;
      }
      
      // Clean up activity lifecycle callbacks if registered
      if (activity != null) {
        try {
          Application app = activity.getApplication();
          if (app != null) {
            app.unregisterActivityLifecycleCallbacks(this);
          }
        } catch (Exception e) {
          // Silently handle exceptions to prevent crashes
        }
        activity = null;
      }
    } catch (Exception e) {
      // Silently handle exceptions to prevent crashes
    }
  }
     /**
      * @return a map of constants this module exports to JS. Supports JSON types.
      */
     public
     Map < String, Object > getConstants() {
       Map < String, Object > map = new HashMap < String, Object > ();
       map.put("Incoming", "Incoming");
       map.put("Offhook", "Offhook");
       map.put("Disconnected", "Disconnected");
       map.put("Missed", "Missed");
       return map;
     }
 
     // Activity Lifecycle Methods
     @Override
     public void onActivityCreated(Activity activity, Bundle savedInstanceType) {
 
     }
 
     @Override
     public void onActivityStarted(Activity activity) {
 
     }
 
     @Override
     public void onActivityResumed(Activity activity) {
 
     }
 
     @Override
     public void onActivityPaused(Activity activity) {
 
     }
 
     @Override
     public void onActivityStopped(Activity activity) {
 
     }
 
     @Override
     public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
 
     }
 
     @Override
     public void onActivityDestroyed(Activity activity) {
 
     }
 
         @Override
    public void phoneCallStateUpdated(int state, String phoneNumber) {
      try {
        if (this.reactContext == null) {
          return;
        }

        jsModule = this.reactContext.getJSModule(CallStateUpdateActionModule.class);
        
        if (jsModule == null) {
          return;
        }

        switch (state) {
          //Hangup
        case TelephonyManager.CALL_STATE_IDLE:
          if (wasAppInOffHook == true) { // if there was an ongoing call and the call state switches to idle, the call must have gotten disconnected
            jsModule.callStateUpdated("Disconnected", phoneNumber);
          } else if (wasAppInRinging == true) { // if the phone was ringing but there was no actual ongoing call, it must have gotten missed
            jsModule.callStateUpdated("Missed", phoneNumber);
          }

          //reset device state
          wasAppInRinging = false;
          wasAppInOffHook = false;
          break;
          //Outgoing
        case TelephonyManager.CALL_STATE_OFFHOOK:
          //Device call state: Off-hook. At least one call exists that is dialing, active, or on hold, and no calls are ringing or waiting.
          wasAppInOffHook = true;
          jsModule.callStateUpdated("Offhook", phoneNumber);
          break;
          //Incoming
        case TelephonyManager.CALL_STATE_RINGING:
          // Device call state: Ringing. A new call arrived and is ringing or waiting. In the latter case, another call is already active.
          wasAppInRinging = true;
          jsModule.callStateUpdated("Incoming", phoneNumber);
          break;
        }
      } catch (Exception e) {
        // Silently handle exceptions to prevent crashes
      }
    }
   }

