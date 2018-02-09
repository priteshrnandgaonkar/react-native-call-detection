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

- (NSDictionary *)eventNameMap
{
  return @{
   CTCallStateConnected    : @"Connected",
   CTCallStateDialing      : @"Dialing",
   CTCallStateDisconnected : @"Disconnected",
   CTCallStateIncoming     : @"Incoming"
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

- (NSArray<NSString *> *)supportedEvents {
    return @[@"PhoneCallStateUpdate"];
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

RCT_EXPORT_METHOD(currentCalls:(RCTResponseSenderBlock)_callback) {
    self.callCenter = [[CTCallCenter alloc] init];
    NSMutableArray<NSDictionary *> *calls = [[NSMutableArray alloc] init];

    for (CTCall *currentCall in self.callCenter.currentCalls) {
        [calls addObject:@{@"callID": currentCall.callID, @"callState": [self.eventNameMap objectForKey: currentCall.callState ]}];
    }
    _callback(@[[NSNull null], calls]);
}

- (void)handleCall:(CTCall *)call {
    _callCenter = [[CTCallCenter alloc] init];

    [_callCenter setCallEventHandler:^(CTCall *call) {
        [self sendEventWithName:@"PhoneCallStateUpdate"
                                                     body:[self.eventNameMap objectForKey: call.callState]];
    }];
    [self sendEventWithName:@"PhoneCallStateUpdate"
                                                     body:[self.eventNameMap objectForKey: call.callState]];
}

@end
