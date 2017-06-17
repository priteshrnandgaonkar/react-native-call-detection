//
//  CallDetectionManager.m
//  housing
//
//  Created by Amandeep Singh on 16/06/17.
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

- (void)handleCall:(CTCall *)call {
  if (call.callState == CTCallStateDisconnected) {
    if (self.block) {
      self.block(@[]);
      self.block = nil;
    }
  }
}

@end
