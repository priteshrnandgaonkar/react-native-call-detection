//
//  CallDetectionManager.h
//
//
//  Created by Pritesh Nandgaonkar on 16/06/17.
//  Updated by Doug Watkins for Inside Real Estate on 31/07/19
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
#import <CallKit/CallKit.h>

@interface CallDetectionManager : RCTEventEmitter <RCTBridgeModule, CXCallObserverDelegate>
@end
