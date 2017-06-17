//
//  CallDetectionManager.m
//  housing
//
//  Created by Pritesh Nandgaonkar on 17/06/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "CallDetectionManager.h"
@import CoreTelephony;

@interface CallDetectionManager()

@property(strong, nonatomic) CTCallCenter *callCenter;

@end

@implementation CallDetectionManager

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PhoneCallUpdate"];
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

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startListener) {
  // Setup call tracking
  self.callCenter = [[CTCallCenter alloc] init];
  __typeof(self) weakSelf = self;
  self.callCenter.callEventHandler = ^(CTCall *call) {
    [weakSelf handleCall:call];
  };
}

- (void)handleCall:(CTCall *)call {
  NSDictionary *eventNameMap = @{
                                 CTCallStateConnected    : @"Connected",
                                 CTCallStateDialing      : @"Dialing",
                                 CTCallStateDisconnected : @"Disconnected",
                                 CTCallStateIncoming     : @"Incoming"
                                 };
  [self sendEventWithName:@"PhoneCallUpdate" body:eventNameMap[call.callState]];
}

RCT_EXPORT_METHOD(stopListener)
{
  self.callCenter = nil;
}

@end
