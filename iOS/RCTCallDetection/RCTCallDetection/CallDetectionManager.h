//
//  CallDetectionManager.h
//
//
//  Created by Pritesh Nandgaonkar on 16/06/17.
//  Copyright © 2017 Facebook. All rights reserved.
//
//
//#import <Foundation/Foundation.h>
//#import <React/RCTBridgeModule.h>
//#import <React/RCTEventEmitter.h>

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#endif
#import <Foundation/Foundation.h>
#import <CoreTelephony/CTCallCenter.h>
#import <CoreTelephony/CTCall.h>

@interface CallDetectionManager : RCTEventEmitter <RCTBridgeModule>
@end
