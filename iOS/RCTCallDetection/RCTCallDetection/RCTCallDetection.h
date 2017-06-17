//
//  RCTCallDetection.h
//  RCTCallDetection
//
//  Created by Pritesh Nandgaonkar on 17/6/17.
//  Copyright © 2017 Pritesh Nandgaonkar. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#endif

#import <Foundation/Foundation.h>
#import <CoreTelephony/CTCallCenter.h>
#import <CoreTelephony/CTCall.h>

@interface RCTCallDetection : NSObject <RCTBridgeModule>
@end
