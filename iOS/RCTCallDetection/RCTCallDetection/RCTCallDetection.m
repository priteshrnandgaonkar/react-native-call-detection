//
//  RCTCallDetection.m
//  RCTCallDetection
//
//  Created by Pritesh Nandgaonkar on 17/6/17.
//  Copyright © 2017 Pritesh Nandgaonkar. All rights reserved.
//
#import "RCTCallDetection.h"

@interface RCTCallDetection()

@property(strong, nonatomic) RCTResponseSenderBlock block;
@property(strong, nonatomic, nonnull) CTCallCenter *callCenter;

@end


@implementation RCTCallDetection

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addCallDetectionListenerWithBlock:(RCTResponseSenderBlock) block) {
    self.block = block;
    self.callCenter = [[CTCallCenter alloc] init];
    __typeof(self) weakSelf = self;
    self.callCenter.callEventHandler = ^(CTCall *call) {
        [weakSelf handleEvent:call];
    };
}

- (NSDictionary *)constantsToExport
{
    return @{
             @"Connected"   : @"Connected",
             @"Dialing"     : @"Dialing",
             @"Disconnected": @"Disconnected",
             @"Incoming"    : @"Incoming"
             };
}

- (void)handleEvent:(CTCall *)call {
    NSDictionary *eventNameMap = @{
                                   CTCallStateConnected    : @"Connected",
                                   CTCallStateDialing      : @"Dialing",
                                   CTCallStateDisconnected : @"Disconnected",
                                   CTCallStateIncoming     : @"Incoming"
                                   };
    if (self.block) {
        self.block(@[[NSNull null], eventNameMap[call.callState]]);
    }
}

RCT_EXPORT_METHOD(stopListener) {
    self.callCenter = nil;
    self.block = nil;
}

@end
