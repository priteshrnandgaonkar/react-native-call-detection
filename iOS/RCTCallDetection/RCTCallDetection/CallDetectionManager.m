//
//  CallDetectionManager.m
//
//
//  Created by Pritesh Nandgaonkar on 16/06/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "CallDetectionManager.h"
@import CoreTelephony;

typedef void (^CallBack)();
@interface CallDetectionManager()

@property(strong, nonatomic) RCTResponseSenderBlock block;
@property(strong, nonatomic, nonnull) CTCallCenter *callCenter;

@end

@implementation CallDetectionManager

- (NSDictionary *)constantsToExport
{
    return @{
             @"Connected"   : @"Connected",
             @"Dialing"     : @"Dialing",
             @"Disconnected": @"Disconnected",
             @"Incoming"    : @"Incoming"
             };
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"PhoneCallStateUpdate"];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addCallBlock:(RCTResponseSenderBlock) block) {
  // Setup call tracking
  self.block = block;
  self.callCenter = [[CTCallCenter alloc] init];
  __typeof(self) weakSelf = self;
  self.callCenter.callEventHandler = ^(CTCall *call) {
    [weakSelf handleCall:call];
  };
}

RCT_EXPORT_METHOD(startListener) {
    // Setup call tracking
    self.callCenter = [[CTCallCenter alloc] init];
    __typeof(self) weakSelf = self;
    self.callCenter.callEventHandler = ^(CTCall *call) {
        [weakSelf handleCall:call];
    };
}

RCT_EXPORT_METHOD(stopListener) {
    // Setup call tracking
    self.callCenter = nil;
}

- (void)handleCall:(CTCall *)call {

    NSDictionary *eventNameMap = @{
                                   CTCallStateConnected    : @"Connected",
                                   CTCallStateDialing      : @"Dialing",
                                   CTCallStateDisconnected : @"Disconnected",
                                   CTCallStateIncoming     : @"Incoming"
                                   };

    _callCenter = [[CTCallCenter alloc] init];

    [_callCenter setCallEventHandler:^(CTCall *call) {
        [self sendEventWithName:@"PhoneCallStateUpdate"
                                                     body:[eventNameMap objectForKey: call.callState]];
    }];
    [self sendEventWithName:@"PhoneCallStateUpdate"
                                                     body:[eventNameMap objectForKey: call.callState]];
}

@end
